import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { RequestCacheWithMap } from "./request-cache-with-map.service";

@Injectable({
    providedIn: 'root'
  })
export class CachingInterceptor implements HttpInterceptor {

    constructor(private cache: RequestCacheWithMap) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // continue if not cacheable.
        if (!this.isCacheable(req)) {
            console.log("Request is not cacheable", req);
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            return of(cachedResponse)
        } else {
            return this.sendRequest(req, next);
        }
    }

    isCacheable(req: HttpRequest<any>) {
        return req.method === 'GET';
    }


    /**
     * Get server response observable by sending request to `next()`.
     * Will add the response to the cache on the way out.
     */
    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                // There may be other events besides the response.
                if (event instanceof HttpResponse) {
                    this.cache.put(req, event); // Update the cache.
                }
            })
        );
    }
}