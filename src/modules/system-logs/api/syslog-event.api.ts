import { api } from '../../../shared/api/api'

export async function getSyslogEvents() {
  const response = await api.get('/syslog-event')
  if (!response.data.success) {
    throw new Error(response.data.message)
  }
  return response.data.data ?? []
}

export async function getSyslogEventById(
  id: string
) {
  const response = await api.get(`/syslog-event/${id}`)
  return response.data.data
}

export async function deleteSyslogEvent(
  id: string
) {
  const response = await api.delete(`/syslog-event/${id}`)
  return response.data.data
}