export type HttpRequestHandler<Request, Response, Next = undefined> = (
  req: Request,
  res: Response,
  next: Next
) => Promise<void>;
