import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  WifiOff,
  Power,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useSummary,
} from '../hooks/use-summary'
import {
  SummaryCard,
} from '@/shared/components/summary-card'
import {
  LoadingState,
} from '@/shared/components/loading-state'
import {
  ErrorState,
} from '@/shared/components/error-state'
import {
  PageContainer,
} from '@/shared/components/page-container'
import {
  PageHeader,
} from '@/shared/components/page-header'

export function DashboardPage() {
  const {
    data,
    isLoading,
    error,
  } = useSummary()
  const navigate =
    useNavigate()
  if (isLoading) {
    return (
      <LoadingState />
    )
  }
  if (
    error ||
    !data
  ) {
    return (
      <ErrorState
        message="
          Failed to load dashboard summary.
        "
      />
    )
  }
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="
          Network Overview
        "
      />
      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          md:grid-cols-4
          xl:grid-cols-4
        "
      >
        <SummaryCard
          title="Total ONU"
          value={
            data.total
          }
          description="
            Registered + Unregistered
          "
          icon={
            <Activity
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Registered"
          value={
            data.registered
          }
          description="
            Registered ONU
          "
          onClick={() =>
            navigate(
              '/onu',
            )
          }
          icon={
            <CheckCircle2
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Unregistered"
          value={
            data.unregistered
          }
          description="
            Unauthorized ONU
          "
          onClick={() =>
            navigate(
              '/onu/unregistered',
            )
          }
          icon={
            <AlertTriangle
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Online"
          value={
            data.online
          }
          description="
            ONU Online
          "
          onClick={() =>
            navigate(
              '/onu?status=ONLINE',
            )
          }
          icon={
            <Wifi
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Offline"
          value={
            data.offline
          }
          description="
            ONU disconnected from OLT
          "
          onClick={() =>
            navigate(
              '/onu?status=OFFLINE',
            )
          }
          icon={
            <WifiOff
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Power Off"
          value={
            data.powerOff
          }
          description="
            ONU power disconnected
          "
          onClick={() =>
            navigate(
              '/onu?status=ONU_POWER_OFF',
            )
          }
          icon={
            <Power
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Fiber LOS"
          value={
            data.fiberLos
          }
          description="
            Fiber signal lost
          "
          onClick={() =>
            navigate(
              '/onu?status=FIBER_LOS',
            )
          }
          icon={
            <ShieldAlert
              className="
                h-8
                w-8
              "
            />
          }
        />
        <SummaryCard
          title="Unknown"
          value={
            data.unknown
          }
          description="
            Unknown ONU state
          "
          onClick={() =>
            navigate(
              '/onu?status=UNKNOWN',
            )
          }
          icon={
            <HelpCircle className="h-8 w-8" />
          }
        />
      </div>
    </PageContainer>
  )
}