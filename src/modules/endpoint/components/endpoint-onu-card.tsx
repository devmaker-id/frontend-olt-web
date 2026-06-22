import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface Props {
  onu?: any
}

export function EndpointOnuCard({
  onu
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Database ONU
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <div>
          <p className="text-sm text-muted-foreground">
            ONU MODEL
          </p>

          <p>
            {onu?.model ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            ONU PORT
          </p>

          <p>
            {onu?.port ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Signal Status
          </p>

          <p>
            {onu?.signalStatus ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p>
            {onu?.status ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            RX Power
          </p>

          <p>
            {onu?.rxPower ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            TX Power
          </p>

          <p>
            {onu?.txPower ?? '-'}
          </p>
        </div>

      </CardContent>

    </Card>
  )
}