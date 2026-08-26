import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity, CreateActivity } from "../types";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActivities = (id? : string) => {
const queryClient = useQueryClient();
const {currentUser} = useAccount();
const location = useLocation();

const {data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');
      
      return response.data;
    },
    enabled: !id && location.pathname === '/activities' && !!currentUser
  });

  const {data: activity, isLoading: isLoadingActivity } = useQuery ({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser // !! Casts to a boolean
    })

  // Query for fetching data, mutation for updating data
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
        },
        onSuccess: async () => 
        {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    
    const createActivity = useMutation({
        mutationKey: ["createActivity"],
        mutationFn: async (activity: CreateActivity) => {
            const response = await agent.post<string>('/activities', activity);
            return response.data;
        },
        onSuccess: async () => 
        {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => 
        {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })

  return { activities, activity, isLoadingActivity, isLoading, updateActivity, createActivity, deleteActivity };
}