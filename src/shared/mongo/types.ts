export type MongoProjection<T> = Partial<{ [P in keyof T]: 0 | 1 }>;
