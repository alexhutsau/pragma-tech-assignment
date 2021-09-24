import { ApiProperty } from "@nestjs/swagger";

export class GetGroupResult {
  @ApiProperty()
  name: string

  @ApiProperty()
  indexes: string[]
}
