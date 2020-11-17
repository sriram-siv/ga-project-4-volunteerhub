# GA PROJECT 4: VOLUNTEER HUB
### BRIEF

In a team of 2, create a full stack app using React, Django and PostgreSQL with a design and functionality of our own choosing.

### TIMEFRAME

7 days

### OUTLINE

Our idea for an app was tool which would allow people to organise volunteers on charitable projects. We had both recently experienced community led projects (COVID mutual aid and the response to the Beirut explosion) which were composed of overlapping groups and organised using basic tools like Google forms. We felt that we could create something that allowed for simple management of volunteers through their schedule availability and skill sets. A user could also use this data to find projects in their vicinity that suited their skills.

###  PLANNING

With the experience of our last project in mind we started planning for this by creating an Entity Relationship Diagram. During our previous project the database models had to be updated multiple times as we had not fully considered the relationships; this time with the diagram we could easily see the necessary connections due to having a visual representation. We also had a good idea of which resources would own the data in the one-to-many fields.

![](README/Screenshot%202020-11-17%20at%2013.07.50.png)

We followed up with a few wireframes for the main page components. These were mostly simple and ended up being a good representation of the final product, apart from the campaign view page which evolved a lot over time as we continued to add features later in the process.

### CHAT FEATURE WITH WEBSOCKETS

The big unknown element of the project was the use of WebSockets to enable a live chat feature. We felt that the functioning of the app was completely dependent on this as it was all about communication between groups.

We started work on this by simply spending time reading the docs and finding as much extra information as we could about the implementation. We found that most material out there was based around the templated HTML style of Django; this tripped us up  a fair bit due to our lack of experience with Django and unfamiliarity with the general structure. After a couple of unsuccessful hours we decided to start over completely and had an almost immediate success. I think that this was because the failed attempt gave us a good amount of practice with the framework and allowed us to understand the whole process more clearly the second time around.

Once we had the backend set up and the front end communicating with it, we sat back down to plan out how the data would be stored. We drew a second set of diagrams showing how the messages would be stored in relation to the rooms, and how the rooms would relate to the projects and users too.  We decided at this point that all projects would be initialised with two default chat rooms - one for all admin (coordinators) and one for all volunteers. We planned to allow the coordinators to create custom rooms for more specific groups in the project.

After the structure of the chat feature was all set up I started to work on the UI components for it. I had decided to use the Styled Components library in this project as the idea of including styling in components to make them totally stand-alone was really appealing to me from a design point of view. One of the first components that I used it with was the chat message boxes. I wanted to achieve a simple layout of having a box with rounded corners, shadows and a small triangle attached to make it look like a speech bubble. I found that trying to created this in CSS was a bit trickier than I imagined, as the triangle (made using clip-path) would not allow for a box-shadow. I got around this by making another triangle that was blurred and sat underneath to look like a shadow. I also needed to create two different styles for the users own messages and those of other people (different sides of the screen and colours). Using Styled Components was really useful in dealing with these issues as it allowed me to write quite specific CSS without having to worry about a ballooning CSS file or reusable class names and also to make the CSS easily responsive to different situations using the props system.

Next up was tackling the formatting of links in the chat. I think that I started this task without realising that it would be so thorny; I simply wanted to use RegEx to determine any links and then wrap them in an <a> tag. Finding the right RegEx was very quick after a short search, but then transforming the string was not working as it should, with the formatted text displaying the tags rather than reading them as HTML. I solved this by splitting the links out of the text and reinserting them as new anchor elements.

In the code below, the message content is first split where new lines occur and then each section is inserted as a paragraph in order to preserve the formatting.

```javascript
{data.text.split('\n').map((line, i) => {
	// Find all links and separate from plain text, return as an array
  const interpolated = this.interpolateLinks(line)
	// If array item is a link, return an anchor, otherwise return plain text
  return <Text key={i}>{interpolated.map(frag => (
    frag.match(linkMatch) ? <Link href={this.getHref(frag)} target="_blank">{frag}</Link> : frag
   ))}</Text>
})}
```

I then wrote some code to scroll the window to any new messages and started working on a simple input component. During the work on the chat component I had also been creating some custom inputs using the Styled Components to get some practice. I had managed to build some simple inputs including a text area; I dropped this into my new chat input and styled the it to have small toolbar along the bottom. This would include a send button and later on an emoji button too. I wrote a small helper function for the chat input so that shift + enter would result in a new line and enter on its own would send the message.

![](README/chat-window%202.gif)

### CREATING A STYLE WITH THEMES

During the work on the chat component I had also been working on some styled inputs to be used across the app. As I was working on these things I had worked out a colour theme (yellow and light pink) and also picked out some alternatives for a dark mode.  This was a really fun feature to add in as I always enjoy its inclusion on websites that I use. The implementation using Styled Components was very straightforward too; I simply defined the variables for each theme in the root component (primary colour, background, accents, etc.) and then passed the information down to all child components using the Theme Provider.

![](README/theme-switching%202.gif)

Setting up these base variables and simple components like the inputs was perhaps the major win for me in this project. It gave the app consistency and the reusability sped up work when building more complex components considerably; a lot of the UI work towards the end of the project felt as simple as clicking Lego pieces together.
It  also opened my eyes to the difficulty of designing reusable components and will be something that I will continue to focus on in the future.

![](README/scheduler%202.gif)

As we moved into the second half of the week, my partner moved over to working with me on the front end as the back end work was mostly done. Having made these reusable components really paid off here as it allowed them to jump into design work without having to worry about consistency or needing to be familiar with all of the  inner workings of the pieces.

### MAP FOR PROJECT DISCOVERY

The index page was going to be a map with some search inputs and list display that showed all projects that were visible on the map, along with markers for each one.

The work that I had done in a previous project using the Mapbox component paid off here as I was able to set it up in a fraction of the time and with much cleaner code. I made some custom markers and linked the search components up to filter the data coming in from the back end. This would also filter by the bounds of the map using a couple of checks against the LatLng data for each project.

I then built a list list display for the results that would contain a card for each one. These cards were made to be expandable upon clicking; the idea was to only display a single card if it was expanded.  The combination of React and Styled Components made the functionality for this quite clean. Upon clicking a card, its ID would be sent back to the parent which would move the selected card into the right position. This made the transition (simply using the CSS property) really smooth as the effects of all the cards were synchronised due to the parent components control over them.

I used this setup later on in the volunteer management feature which turned out really well. It consisted of two of these components that would behave in the same way as the cards, where expanding one list would hide the other. I think the use of these components was a big part in making the app feel less like a standard webpage and more like a dynamic application.

### VOLUNTEER MANAGEMENT

Functionality for managing the volunteers was really important to us, as the app would be a more general purpose chat app without it. I  wanted a way for organisers to understand at a glance who was available at any given time as well as be able to find people with specific skills.

The first element that I built was the user side that could be accessed on a users profile page and would allow them to set their availability and declare their skills. I made the scheduling component as shown above and linked it to the back end using a put request to edit the profile data; we simplified the timetable to have 14 slots, am and pm for each day and stored the data as a list of numerical ID’s.

Having set the data on the users, I then pulled the data for all volunteers on a project into the coordinator view; this allowed me to display all of a users relevant data in a card format.

![](README/Screenshot%202020-11-17%20at%2012.40.59%202.png)

As you can see in the image there is a select button on the cards. This allows the coordinator to select any number of users and then create a new chat room with them. This allowed for all of the desired functionality but I wanted to allow coordinators to find the relevant users in a simple manner.

Using the same components that were used for setting the schedule and skills on the profile page I allowed the coordinators to select any number of time slots and skills in order to filter the user list. This also included functionality to filter using strict rules or not; this could be useful in the situation that they would want to find all volunteers available on the weekend without them each needing to be available on both days.

![](README/volunteer-filter%202.gif)

Another component was added to the project view at this point for a community noticeboard. This was intended to display more important messages that would not be suited to chat due to new messages burying the information. The coordinator view of the page differed here only in showing the input for sending new messages and the regular volunteer view would be read only.

### CONCLUSION AND FUTURE IMPROVEMENTS

I was really pleased with the way that this project turned out and was particularly proud of the UI design that I implemented. In comparison with previous projects this one has a much more dynamic feel to it and a more consistent design. I enjoyed working with Styled Components as it allowed me to fully embrace the React approach to separating concerns and made for improved readability of my code. This also led to a fun experience working as a team.

We were quite ambitious with the scope of this project so there are quite a few features that we would have liked to include but did not have the time, with the main ones being: searchable tags for projects, direct messages, emoji shortcuts a la Slack, project timetables with assigned shifts and a photo gallery. However, we both enjoyed the project a lot and are excited to continue work on it, so these features will be added over time.










