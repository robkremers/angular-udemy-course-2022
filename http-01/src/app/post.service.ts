import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, catchError, throwError, tap } from 'rxjs';
import { Post } from './post.model';

/**
 * Purpose:
 * Holds the functionality for the HTTP requests.
 * 
 * Best practice:
 * Move the Observable in the service and create the subscription in the component.
 * Unless there is no need to place the subscription in the component.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private firebaseUrl: string = 'https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/';
  private firebasePostEndpoint: string = 'posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  /**
   * 271. Observing Different Types of Responses.
   * 
   * @param title 
   * @param content 
   */
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    // this.http.post<{ name: string }>(
    //   this.firebaseUrl + this.firebasePostEndpoint,
    //   postData,
    //   {
    //     observe: 'response'
    //   }
    // )
    //   .subscribe(
    //     responseData => {
    //       console.log(responseData);
    //     }, error => {
    //       this.error.next(error.message);
    //     });

    this.http.post<{ name: string }>(
      this.firebaseUrl + this.firebasePostEndpoint,
      postData,
      {
        observe: 'response'
      }
    )
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          this.error.next(error.message);
        }
      });
  }

  /**
 * HttpClient.get(url: string, options: {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };

  '...' is the spread operator.
  The JavaScript spread operator (...) allows us to quickly copy all or
  part of an existing array or object into another array or object.

  261. Showing a Loading Indicator.
  The indicator this.isFetching will indicate during fetching that this process is going on.

  267. Using the catchError Operator.

  269. Setting Headers.
  
  After the implementation of 'headers: new HttpHeaders() below in 
  Developer Tool | Network, in the posts.json, looking in the Headers we can see: 'Custom-Header': 'Hello'

  270. Adding Query Params.

      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        params: new HttpParams().set('print', 'pretty')
      }

  Developer Tool | Network
  --> posts.json?print=pretty
    --> Request URL: https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/posts.json?print=pretty

  In case of multiple query parameters use the construction below.
  Result:
  --> posts.json?print=pretty&custom=key
      --> Request URL: https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/posts.json?print=pretty&custom=key
  Note:
  - custom=key will have no effect. It is not recognized by the Firebase db.
  - print=pretty is recognized and it will cause the response in Developer Tool | Network; posts.json | response to be 
  shown in a more readable fashion.

  272. Changing the Response Body Type.

  In this.http.get<{ [key: string]: Post }>() it is stated that the response will be of type json.
  For this reason responseType: 'text' will not match and this will cause an error.
  However there may be situations in  which it is necessary to adapt the response type.

  @param url — The endpoint URL.
  @param options — The HTTP options to send with the request.
  @return — An Observable of the response, with the response body as an ArrayBuffer.
 */
  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>(this.firebaseUrl + this.firebasePostEndpoint
      ,
      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        params: searchParams,
        responseType: 'json'
      }
    )
      .pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      }),
        catchError(errorRes => {
          // Send to an analytics server for generic error handling.
          return throwError(errorRes);
        })
      );
  }

  /**
   * 264. Sending a DELETE Request.
   * 271. Observing Different Types of Responses.
   * 
   * In RxJS, when a data is sent to the stream it goes through a series of operators:
   * 
   * - The map operator will simply apply a function to that data and return the result.
   * - The tap operator however takes a data, apply a function to that data but returns the original data, 
   * if the function bothered to return a result, tap just ignores it.
   * 
   * Below Enum HttpEventType is used:
   * - https://angular.io/api/common/http/HttpEventType
   * 
   * 272. Changing the Response Body Type.
   * 
   * As a responseType several options are available: 'json', 'blob', 'text', 'arraybuffer.
   * - See e.g. https://angular.io/api/common/http/HttpRequest
   * 
   * In case of responseType: 'text' the response will still be null since there is no body content.
   * However in the HttpResponse, etc. is now visible:
   * body: "null" ==> it's treated as a text.
   * 
   * @returns 
   */
  deleteAllPosts() {
    return this.http.delete(
      this.firebaseUrl + this.firebasePostEndpoint,
      {
        // Options:
        // observe: 'body'
        // observe: 'response'
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(
      tap( event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log(event.body); // Note that in case of a delete no body is present.
        }
        if (event.type === HttpEventType.Sent) {
          // logging event.body is not possible.
        }
      })
    );
  }
}
function next(posts: any): ((value: { name: string; }) => void) | Partial<import("rxjs").Observer<{ name: string; }>> {
  throw new Error('Function not implemented.');
}

