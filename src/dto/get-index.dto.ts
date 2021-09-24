import { ApiProperty } from "@nestjs/swagger";

export class GetIndexResult {
  @ApiProperty()
  name: string

  @ApiProperty()
  ethPriceInWei: string

  @ApiProperty()
  usdPriceInCents: string

  @ApiProperty()
  usdCapitalization: string

  @ApiProperty()
  percentageChange: string
}
