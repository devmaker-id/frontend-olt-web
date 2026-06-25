import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  value: string
  onChange: (
    value: string
  ) => void
}

export function SyslogEventFilter({
  value,
  onChange,
}: Props) {

  return (

    <Select
      value={value}
      onValueChange={onChange}
    >

      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>

        <SelectItem value="all">
          All Types
        </SelectItem>

        <SelectItem value="ONU_LINKUP">
          ONU_LINKUP
        </SelectItem>

        <SelectItem value="ONU_LINKDOWN">
          ONU_LINKDOWN
        </SelectItem>

        <SelectItem value="ONU_ONLINE">
          ONU_ONLINE
        </SelectItem>

        <SelectItem value="ONU_OFFLINE">
          ONU_OFFLINE
        </SelectItem>

        <SelectItem value="ONU_REGISTER">
          ONU_REGISTER
        </SelectItem>

        <SelectItem value="ONU_UNREGISTER">
          ONU_UNREGISTER
        </SelectItem>

        <SelectItem value="ONU_LOS">
          ONU_LOS
        </SelectItem>

        <SelectItem value="ONU_DYING_GASP">
          ONU_DYING_GASP
        </SelectItem>

        <SelectItem value="WEB_LOGIN">
          WEB_LOGIN
        </SelectItem>

        <SelectItem value="WEB_LOGOUT">
          WEB_LOGOUT
        </SelectItem>

        <SelectItem value="SSH_LOGIN">
          SSH_LOGIN
        </SelectItem>

        <SelectItem value="SSH_LOGOUT">
          SSH_LOGOUT
        </SelectItem>

        <SelectItem value="WEB_CONNECTION">
          WEB_CONNECTION
        </SelectItem>

        <SelectItem value="WEB_DISCONNECTION">
          WEB_DISCONNECTION
        </SelectItem>

        <SelectItem value="SYSTEM">
          SYSTEM
        </SelectItem>

        <SelectItem value="UNKNOWN">
          UNKNOWN
        </SelectItem>

      </SelectContent>

    </Select>

  )

}