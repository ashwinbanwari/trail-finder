# Trailess

## Inspiration
With the ever pending doom above us that is coronavirus, we've been spending more and more time indoors. Washington state has been allowing people to go out hiking since June but it's been increasingly difficult to social distance because most trails have become clogged with people. We wanted to find a way to find the trails less traveled by so that we could continue to exercise in nature and also socially distance. We tried to pin down the idea of convenience, and so Trailess was born.

## What it does
The first step is to visit [trailess.space](trailess.space)! There, you will be greeted by a search bar and series of sliders which you can use to find your optimal hike. You can either search if you know what trail you're thinking about, or use the filters to identify a trail within your search parameters. Then you press find trails near me and Trailess will take those parameters and find the trails that meet those parameters nearest to you. Once you're interested in a particular trail, you can click learn more and see the weather forecast there for the next few days, the length of the trail, the altitude gain, highest altitude, rating, region, and a map with a marker showing the location of the hike.

Note: Our data set was pulled from the Washington Trails Association so if you're viewing our project from outside Washington state, the distance might look funky.

## How we built it
To train our sentiment analysis model, we used the AutoML platform on Google Cloud. We also developed a more advanced model that used Twitter-specific feature extraction from a Weka package called AffectiveTweets and then passed those vectors into a neural network regression pipeline on Microsoft Azure's Machine Learning Designer. Unfortunately, we weren't able to fully connect this model to our project in time.

We used React.js to create the website, Express.js to manage our API, the Google Cloud Node.js library to connect with the model, and the Twit Node.js library to communicate with the Twitter API. We then hosted our own API on Heroku and deployed the website on Netlify.

## Challenges we ran into
Being students at the University of Washington, our school started this past week so we were unable to get started until Saturday afternoon which compressed our development time.
We had a lot of difficulty connecting the model we trained on Azure due to the [AffectiveTweets](https://affectivetweets.cms.waikato.ac.nz/) Weka package, which was created specifically for the sentiment analysis of Tweets. We would have had to create and deploy a separate REST API in Java in order to add [Weka](https://www.cs.waikato.ac.nz/ml/weka/), an open-source machine learning tool, to our workflow.

## What we learned
We learned many new technologies and are extremely happy that we were able to connect all the pieces of the puzzle into a working project! Through reading some of the existing literature ([1](https://web.cs.wpi.edu/~emmanuel/publications/PDFs/C30.pdf), [2](https://ieeexplore.ieee.org/document/8281813), [3](https://arxiv.org/ftp/arxiv/papers/1601/1601.06971.pdf)) related to our project, we were also fascinated by the complicated, living microcosm of society that Twitter encompasses within the 500 million tweets that are sent each day from every corner of the world.

## What's next for Trailess
Here is a list of potential ideas that could expand Trailess: 
* Create a reccomended trails page based on prior trails that the users have visited
* Create a see similar page on the bottom of each card so that trail-goers can view similar hikes to the one they're currently viewing
* Display trends of popularity based on when reviews of the trail are published
