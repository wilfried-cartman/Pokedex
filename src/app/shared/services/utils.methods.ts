import QueryParamsModel from "../../models/queryParams.model";
import TablePagesModel from "../../models/tablePages.model";

export class UtilsMethods {
  static generatePages(nbTotalItems: number, queryParams: QueryParamsModel): TablePagesModel {
    let pages: TablePagesModel = new TablePagesModel();
    pages.pageSize = queryParams.limit;
    const n = nbTotalItems % queryParams.limit != 0 ?
      (nbTotalItems / queryParams.limit + 1) :
      (nbTotalItems / queryParams.limit);
    pages.pagesTotal = Number.parseInt(n.toString());
    let startSize = 0;
    let endSize = 0;
    if (queryParams.offset % pages.paginationSize != 0) {
      let maxBorn: number = pages.paginationSize;
      let minBorn: number = queryParams.offset;
      for (let i = queryParams.offset + 1; i < (queryParams.offset + pages.paginationSize); i++) {
        if (i % pages.paginationSize == 0) {
          maxBorn = i;
          break;
        }
      }
      for (let i = (queryParams.offset - pages.paginationSize); i < queryParams.offset; i++) {
        if (i % pages.paginationSize == 0) {
          minBorn = i;
          break;
        }
      }
      startSize = minBorn <= 1 ? 0 : minBorn;
      endSize = pages.pagesTotal < maxBorn ? pages.pagesTotal : maxBorn;
    } else {
      startSize = queryParams.offset;
      endSize = pages.pagesTotal > pages.paginationSize ? (queryParams.offset + pages.paginationSize) : pages.pagesTotal;
      endSize = pages.pagesTotal < endSize ? pages.pagesTotal : endSize;
    }
    for (let i = startSize; i < endSize; i++) {
      pages.pages.push(i + 1)
    }
    pages.currentPage = queryParams.offset + 1;
    return pages;
  }
}
