export interface IService<Data = any, Response = any> {
  execute(data?: Data): Promise<Response>;
} 