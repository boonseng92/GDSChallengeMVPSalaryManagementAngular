import {async, inject, TestBed} from '@angular/core/testing';
import { SearchService } from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SearchService
      ],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it(`should fetch posts as an Observable`, async(inject([HttpTestingController, SearchService],
    (httpClient: HttpTestingController, postService: SearchService) => {

      //
      const postItem = [
        {
          'id': 'e0001',
          'login': 'hello',
          'name': 'name',
          'salary': 100.0
        }
      ];

      const minSalary = '100';
      const maxSalary = '10000';
      const SortByColumn = 'id';
      const SortbyOrder = '+';
      const offset = 0;
      const limit = 5;

      postService.searchemployees(minSalary, maxSalary, SortByColumn,
        SortbyOrder, offset, limit)
        .subscribe((posts: any) => {
          expect(posts.length).toBe(1);
        });

      const req = httpMock.expectOne('http://localhost:8080/users?minSalary=' + minSalary + '&maxSalary='
        + maxSalary + '&offset=' + offset + '&limit=' + limit + '&sort=' + SortbyOrder + SortByColumn);
      expect(req.request.method).toBe('GET');

      req.flush(postItem);
      httpMock.verify();

    })));
});
