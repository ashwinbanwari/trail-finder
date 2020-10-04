# Trailess

## Inspiration
With the ever pending doom above us that is coronavirus, we've been spending more and more time indoors. Washington state has been allowing people to go out hiking since June but it's been increasingly difficult to social distance because most trails have become clogged with people. We wanted to find a way to find the trails less traveled by so that we could continue to exercise in nature and also socially distance. We tried to pin down the idea of convenience, and so Trailess was born.

## What it does
The first step is to visit [trailess.space](trailess.space)! There, you will be greeted by a search bar and series of sliders which you can use to find your optimal hike. You can either search if you know what trail you're thinking about, or use the filters to identify a trail within your search parameters. Then you press find trails near me and Trailess will take those parameters and find the trails that meet those parameters nearest to you. Once you're interested in a particular trail, you can click learn more and see the weather forecast there for the next few days, the length of the trail, the altitude gain, highest altitude, rating, region, and a map with a marker showing the location of the hike.

Note: Our data set was pulled from the Washington Trails Association so if you're viewing our project from outside Washington state, the distance might look funky.

## How we built it
We built this web app using ReactJS framework, and MaterialUI for UI. We pulled our dataset from Washington Trails Association using a Python script and are using Google Maps to visualize location and Radar.io to determine distance and time from the user.


## Challenges we ran into
Being students at the University of Washington, our school started this past week so we were unable to get started until Saturday afternoon which compressed our development time. We also had difficulties getting Google Maps to cooperate as it sometimes refused to show up and at other times would show the wrong data.

## What we learned
We learned many new technologies and are extremely happy that we were able to connect all the pieces of the puzzle into a working project! Through our data sifting, we were able to learn how to parse CSV files and visually represent it in a way that was palatable by all.

## What's next for Trailess
Here is a list of potential ideas that could expand Trailess: 
* Create a recommended trails page based on prior trails that the users have visited
* Create a see similar page on the bottom of each card so that trail-goers can view similar hikes to the one they're currently viewing
* Display trends of popularity based on when reviews of the trail are published
