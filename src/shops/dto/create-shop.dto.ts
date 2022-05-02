
export class CreateShopDTO {
    name: string;
    description: string;
}

export class UpdateShopDto {
    id: string;
    shop: CreateShopDTO;
}