import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity, CreateActivity } from "../types";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');

            return response.data;
        },
        enabled: !id && location.pathname === '/activities' && !!currentUser,
        select: data => {
            return data.map(activity => {
                return {
                    ...activity,
                    isHost: currentUser?.id == activity.hostId,
                    isGoing: activity.attendees.some(x => x.id == currentUser?.id)
                }
            })
        }
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: data => {
            return {
                ...data,
                isHost: currentUser?.id == data.hostId,
                isGoing: data.attendees.some(x => x.id == currentUser?.id)
            }
        }
    })

    // Query for fetching data, mutation for updating data
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });


    const createActivity = useMutation({
        mutationKey: ["createActivity"],
        mutationFn: async (activity: CreateActivity) => {
            const response = await agent.post<string>('/activities', activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const updateAttendance = useMutation({
        mutationFn: async (activityId: string) => {
            await agent.post(`/activities/${activityId}/attend`);
        },
        onMutate: async (activityId) => {
            // Stop outgoing refetches so they don't overwrite the optimistic update
            await queryClient.cancelQueries({ queryKey: ['activities', activityId] });

            const previousActivity: Activity | undefined = queryClient.getQueryData<Activity>(['activities', activityId]);

            // Optimistically update to the new value
            queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
                if (!oldActivity || !currentUser) return oldActivity; // Can't update activity if there's no old activity or current user

                const isHost = oldActivity.hostId === currentUser.id;
                const isGoing = oldActivity.attendees.some(x => x.id === currentUser.id);

                return {
                    ...oldActivity, isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isGoing
                        ? isHost
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter(x => x.id !== currentUser.id)
                        : [...oldActivity.attendees, {
                            id: currentUser.id,
                            displayName: currentUser.displayName,
                            imageUrl: currentUser.imageUrl
                        }],
                }
            })

            return { previousActivity };
        },
        onError: (err, activityId, context) => {
            if (context?.previousActivity) {
                queryClient.setQueryData(['activities', activityId], context.previousActivity);
            }
            console.error('Error updating attendance:', err);
        },
        onSettled: async (_, activityId) => {
            await queryClient.invalidateQueries({
                queryKey: ['activities', activityId]
            });
        }
    });

    return {
        activities, activity, isLoadingActivity, isLoading, updateActivity,
        createActivity, deleteActivity, updateAttendance
    };
}