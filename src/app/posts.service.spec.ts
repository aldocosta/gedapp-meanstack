import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  beforeEach(() => {    
    TestBed.configureTestingModule({
      providers: [PostsService]
    });
  });
/*
  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
  */
});
