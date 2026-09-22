import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Photo, Profile, User } from "../types";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfile = (id?: string, predicate?: string) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        enabled: !!id  && !predicate, 
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`)
            return response.data;
        },
    });

    const photosQuery = useQuery<Photo[]>({
        queryKey: ['profilePhotos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`)
            return response.data;
        },
        enabled: !!id && !predicate
    });

    const {data: followings, isLoading: loadingFollowings} = useQuery<Profile[]>({
        queryKey: ['followings', id, predicate],
        queryFn: async () => {
            const response = await agent.get<Profile[]>(`/profiles/${id}/follow-list?predicate=${predicate}`);
            return response.data;
        },
        enabled: !!id && !!predicate
    })

    const deletePhoto = useMutation({
        mutationFn: async (photoToDelete: Photo) => {
            await agent.delete(`/profiles/${photoToDelete.id}/photos`);
        },
        onMutate: async (photoToDelete) => {
            // Stop outgoing refetches so they don't overwrite the optimistic update
            await queryClient.cancelQueries({ queryKey: ['profilePhotos', id] });

            const previousPhotos = queryClient.getQueryData<Photo[]>(['profilePhotos', id]);

            // Optimistically update to the new value
            queryClient.setQueryData<Photo[]>(['profilePhotos', id], (currentPhotos) =>
                currentPhotos?.filter((currentPhoto) => currentPhoto.id !== photoToDelete.id) ?? []);

            return { previousPhotos };
        },
        onError: (err, _photo, context) => {
            console.error('Error deleting photo:', err);
            queryClient.setQueryData(['profilePhotos', id], context?.previousPhotos);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['profilePhotos', id]
            });
        }
    })

    const changeBio = useMutation({
        mutationFn: async (bio: string) => {
            const response = await agent.put<string>("/profiles/bio", { bio })
            return response.data;
        },
        onSuccess: (newBio, _variables, _context) => {
            queryClient.setQueryData<Profile>(
                ['profile', id],
                (currentProfile) => currentProfile
                    ? { ...currentProfile, bio: newBio }
                    : currentProfile
            );
            console.log("Successfully updated bio");
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const addPhoto = useMutation({
        mutationFn: async (photoToAdd: File) => {
            const formData = new FormData();
            formData.append("file", photoToAdd);

            const response = await agent.post<Photo>("/profiles/add-photo", formData);
            return response.data;
        },
        onMutate: async (photo) => {
            // Stop outgoing refetches so they don't overwrite the optimistic update
            await queryClient.cancelQueries({ queryKey: ['profilePhotos', id] });

            const previousPhotos = queryClient.getQueryData<Photo[]>(['profilePhotos', id]);

            const temporaryUrl = URL.createObjectURL(photo);

            // Temporary Photo
            const temporaryPhoto: Photo = {
                id: `temp-${crypto.randomUUID()}`,
                url: temporaryUrl,
                publicId: '',
                userId: id ?? ''
            }

            // Optimistically update to the new value
            queryClient.setQueryData<Photo[]>(['profilePhotos', id], (currentPhotos) => [
                ...(currentPhotos ?? []), temporaryPhoto]
            )

            return { previousPhotos, temporaryPhoto, temporaryUrl }
        },
        onError: (err, _photo, context) => {
            queryClient.setQueryData(['profilePhotos', id], context?.previousPhotos)
            console.error('Error uploading a photo:', err);
        },
        onSuccess: async (savedPhoto, _file, context) => {
            queryClient.setQueryData<Photo[]>(
                ['profilePhotos', id],
                currentPhotos => currentPhotos?.map(photo => photo.id === context.temporaryPhoto.id ? savedPhoto : photo) ?? []
            );

            await queryClient.invalidateQueries({
                queryKey: ['profilePhotos', id]
            });
        },
        onSettled: (_data, _error, _file, context) => {
            if (context?.temporaryUrl) {
                URL.revokeObjectURL(context.temporaryUrl);
            }

            queryClient.invalidateQueries({
                queryKey: ['profilePhotos', id]
            });
        }
    })

    const updateFollowing = useMutation({
        mutationFn: async () => {
            agent.post(`/profiles/${id}/follow`);
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                queryClient.invalidateQueries({queryKey: ['followings', id, 'followers']})
                if (!profile || profile.followersCount == undefined) return profile;
                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following
                        ? profile.followersCount - 1
                        : profile.followersCount + 1
                }
            })
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

    return {
        profile,
        loadingProfile,
        photosQuery,
        deletePhoto,
        addPhoto,
        changeBio,
        updateFollowing,
        isCurrentUser,
        followings,
        loadingFollowings
    }
}