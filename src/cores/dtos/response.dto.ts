export class ResponseDto<T, M> {
  data: T;
  meta: M;
  message: string;
  status: number;
  time: Date;
}
