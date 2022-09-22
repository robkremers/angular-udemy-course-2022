import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string =  null;
  private errorSub: Subscription;


  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe( errorMessage => {
      this.error = errorMessage;
    });
    /**
     * Since this is a subscription all POST content will be visible in Developer Tool | Console.
     */
    this.isFetching = true;
    // this.postService.fetchPosts().subscribe(posts => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // }, error => {
    //   this.isFetching = false;
    //   /**
    //    * Here Firebase returns a complete Error Object, visible in the Console with multiple items, like the status.
    //    * In this object a separate error key may or may not exist. If existing it may contain a more useful 
    //    * message.
    //    */
    //   this.error = error.message;
    //   console.log(error);
    //   console.log(error.status);
    // });

    /**
     * https://angular.io/guide/observables
     * - This is an example how to implement an Observable in the style recommended by RjJS.
     * Note that the style shown above is deprecated.
     * A difference is that in the new style (but the entire Observable should be rewritten)
     * the error only pops up when the button is pushed instead of immediately in case Firebase can not be read.
     * 
     * Notes:
     * - Most online examples are still using the code as given in the course.
     * - Important is to still use an arrow function, so that this points to the component, and not to the observer object.
     */

    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(this.loadedPosts);
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
        console.log(this.error);
      },
      complete() {
        this.isFetching = false;
         console.log('ngOnInit(): this.postService.fetchPosts().subscribe(): Completed');
      }
    });

  }

  /**
   * Firebase test application:
   * - https://console.firebase.google.com/project/ng-complete-guide-f5ed5/database/ng-complete-guide-f5ed5-default-rtdb/data
   * 
   * Technical details:
   * - url to the Firebase database:
   *  - https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/
   *  - Firebase requires that the url ends with 'postsjson'.
   * 
   * @param postData: { title: string; content: string }
   *  The postData ( string, content) is typed in input field 'title' and textarea 'content'. 
   */
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);

    /**
     * HttpClient.post(url: string, body: any, options: {
     * headers?: HttpHeaders | {
     *     [header: string]: string | string[];
     * };
     * It is necessary to set up an Observable and subscribe to it.
     * Otherwise Angular will not send the POST request.
     * this.http.post will return an Observable.
     * 
     * In Developer Tool | Network 2 files posts.json will be visible:
     * - The first will contain:
     * Request URL: https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/posts.json
Request Method: OPTIONS
Status Code: 200 OK
Remote Address: 34.107.226.223:443
Referrer Policy: strict-origin-when-cross-origin

this checks whether it is allowed to send a POST request.

- The second will contain:
Request URL: https://ng-complete-guide-f5ed5-default-rtdb.europe-west1.firebasedatabase.app/posts.json
Request Method: POST
Status Code: 200 OK
Remote Address: 34.107.226.223:443
Referrer Policy: strict-origin-when-cross-origin

This is the actual POST request.

In Developer Tool | Console will be visible:

{name: '-MxW-V-sgIweOWMqidlA'}
name: "-MxW-V-sgIweOWMqidlA"
[[Prototype]]: Object

     */
    // this.http.post<{name: string}>(
    //   this.firebaseUrl + this.firebasePostEndpoint,
    //   postData).subscribe(responseData => {
    //     console.log(responseData);
    //   });
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http GET request
    // The received content will be saved in this.loadedPosts.
    this.isFetching = true;
    // this.postService.fetchPosts().subscribe(posts => {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    //   console.log(posts);
    //   console.log(this.loadedPosts[0].title);
    // }, error => {
    //   this.isFetching = false;
    //   this.error = error.message;
    // });

    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log('onFetchPosts(): this.loadedPosts.length = ' + this.loadedPosts.length + ',  !this.isFetching = ' + !this.isFetching);
        console.log(this.loadedPosts);
        if (this.loadedPosts.length > 0) {
          console.log(this.loadedPosts[0].title + '; ' + this.loadedPosts[0].content );
        }
      }, 
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    });
  }

  // 264. Sending a DELETE Request.
  onClearPosts() {
    // Send Http request
    this.postService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }

}

function Post(responseData: any, Post: any): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

