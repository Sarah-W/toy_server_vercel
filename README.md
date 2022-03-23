# toy_server
This repo contains a response to a code challenge.

Clone the repo, and copy in the .env file.    
Install with

```npm install```

Then start the server.

```npm start```
  
***

## Test using CURL

This is **not** an exhaustive list of tests, and it should probably be automated. Also, I need to document the actual error messages. Rest assured, there are some...  

If you want to test "PUT" you will have to obtain the SECRET_TOKEN out of .env. 

```curl http://localhost:8080 ```

Should return an array containing all of our animals.

If you want to test PUT requests you will have to obtain the SECRET_TOKEN out of .env. (This is not good auth, but it leaves a place for doing it properly later.)

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":"Bob","Type":"Bear"}' localhost:8080/```

should succeed.

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":12,"Type":"Bear"}' localhost:8080/```

should fail as Name is not a string.

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":"Iris","Type":"Ibex"}' localhost:8080/```

should fail as "Ibex" is not an allowed value for Type.

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":"Tony","Type":"Tiger"}' localhost:8080/```

should fail, because there is no Tiger Type.

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":"Tony","Type":"Tiger","Tiger Type":"Fierce"}' localhost:8080/```

should succeed.

```curl -H "authorization:<SECRET_TOKEN>" -X PUT -d '{"Name":"Tony","Type":"Tiger","Tiger Type":"Fierce", "Height":"134 cm"}' localhost:8080/```   

 should fail, as we are not accepting fields outside the required ones.
 

***

## Note to evaluators

**In the interest of full disclosure....**

This exercise was outside my skillset as a front-end developer, but not far outside it. The concepts were familiar to me, but I have never independently developed something like it before.  

As such, I sought help from a friend and mentor, and much of this was done as a pair programming exercise over the course of about three and a half hours on the evening of Tuesday 22/03/2022 (With a couple of breaks, first for fish and chips, and second to watch the storm coming through.) This is a little longer than reccomended in the exercise, but I had been meaning to learn how to do this for some personal projects anyway.

I estimate that had I had to learn this through self-study it would have taken about 20 hours to get to the same point. 

## Decisions

- I have gone with a vanilla node server rather than Express or a similar framework, because I do not have a good feel for the limitations of node.      
- I have chosen mongodb on Atlas as it is what we have been using in my current role, I am familiar with it and already had an account. 
- I have used JSON schema validation, as we are passing around JSON documents. The error messages returned by the validation library are also well suited to informing user discovery through a front end interface.  

## Roadmap

I have put some things I would work on more in the issues tracker. Again, not an exhaustive list...
I would also probaly write a front-end fairly soon, as that can guide my thoughts as to how information/errors can be displayed.


