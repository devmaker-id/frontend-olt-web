import { useQuery } from "@tanstack/react-query";
import { getOnus } from "../api/onu.api";
import type { Onu } from "../types/onu.types";

export function useOnus() {
    return useQuery<Onu[]>({
        queryKey: ['onus'],
        queryFn: getOnus
    })
}