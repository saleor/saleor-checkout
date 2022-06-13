import { ErrorCode } from "@/checkout/lib/globalTypes";

export interface ApiError<TFormData> {
  field: keyof TFormData;
  code: string;
  message: string;
}
export type ApiErrors<TFormData> = ApiError<TFormData>[];

export type Errors<TFormData> = Partial<
  Record<keyof TFormData, Error<TFormData>>
>;

export interface Error<TFormData> {
  field: keyof TFormData;
  code: ErrorCode;
  message: string;
}
