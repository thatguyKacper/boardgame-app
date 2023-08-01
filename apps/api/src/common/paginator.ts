// import { Expose } from 'class-transformer';
// import { SelectQueryBuilder } from 'typeorm';

// export interface PaginatorOptions {
//   currentPage?: number;
//   lastPage?: number;
//   nextPage?: number;
//   prevPage?: number;
//   limit?: number;
// }

// export class PaginationResult<T> {
//   constructor(partial: Partial<PaginationResult<T>>) {
//     Object.assign(this, partial);
//   }
//   @Expose()
//   meta: {
//     curent_page: number;
//     last_page: number;
//     next_page?: number;
//     prev_page?: number;
//     limit?: number;
//     total?: number;
//   };
//   @Expose()
//   data: T[];
// }

// export async function paginate<T>(
//   qb: SelectQueryBuilder<T>,
//   options: PaginatorOptions = {
//     limit: 50,
//     currentPage: 1,
//   },
// ): Promise<PaginationResult<T>> {
//   const offset = (options.currentPage - 1) * options.limit;
//   const total = await qb.getCount();
//   const data = await qb.take(options.limit).skip(offset).getMany();

//   return new PaginationResult({
//     meta: {
//       curent_page: options.currentPage,
//       next_page:
//         options.currentPage + 1 <= total / options.limit
//           ? options.currentPage + 1
//           : null,
//       prev_page: options.currentPage - 1 < 1 ? null : options.currentPage - 1,
//       last_page: Math.ceil(total / options.limit),
//       limit: options.limit,
//       total: total ? await qb.getCount() : null,
//     },
//     data,
//   });
// }

import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginatorOptions {
  currentPage?: number;
  lastPage?: number;
  nextPage?: number;
  prevPage?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  meta: {
    curent_page: number;
    last_page: number;
    next_page?: number;
    prev_page?: number;
    limit?: number;
    total?: number;
  };

  data: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginatorOptions = {
    limit: 50,
    currentPage: 1,
  },
): Promise<PaginationResult<T>> {
  const offset = (options.currentPage - 1) * options.limit;
  const total = await qb.getCount();

  let query = qb.take(options.limit).skip(offset);

  if (options.sortBy && options.sortOrder) {
    const order: 'ASC' | 'DESC' = options.sortOrder.toUpperCase() as
      | 'ASC'
      | 'DESC';
    query = query.orderBy(options.sortBy, order);
  }

  const data = await query.getMany();

  return new PaginationResult({
    meta: {
      curent_page: options.currentPage,
      next_page:
        options.currentPage + 1 <= Math.ceil(total / options.limit)
          ? options.currentPage + 1
          : null,
      prev_page: options.currentPage - 1 < 1 ? null : options.currentPage - 1,
      last_page: Math.ceil(total / options.limit),
      limit: options.limit,
      total: total ? await qb.getCount() : null,
    },
    data,
  });
}
