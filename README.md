# Welcome to Movie_Reels
    Movie_Reel is a site dedicated to the movies you love. When you register as a Movie_Reels user and Login you will have access to start making Reels of your favorite movies. Think of a 'Reel' as you would a 'playlist'. A 'playlist of songs' is a 'Reel of movies'. This project was created using React on the frontend, connecting to an express SQLite3 backend.
    By making Reels you will not only have a place to save your favorite movies, and make awesome compilations, but also a way to share movies you love with others. Users will have the ability to "Search for reels like ____.". Users enter a movie they love, and then Movie_Reels find Reels that user may like based on the movie.
    The idea is to help our users move from a favorite movie, to a new Reel with potentially many more <strong>new</strong> favorite movies. Hopefully this app will help you find that next movie to watch, as you sink in your couch with a nice bowl of popcorn. Thanks for being a user and contributing to our community!


## Summary of User Experience
  [Link to wireframe here](https://www.figma.com/file/RVZLbaNHTxZzNSSU12yiKT/MovieReel?node-id=0%3A1). The basic layout started like the wirefram above. The user should register --> get send to login --> then get sent to their Reels page. Once there they can start making new reels, and then adding movies to those reels. Movie_Reels uses an external API omdb, for users to search movies. This is beneficial, as it creates congruency when users have the same movie in seperate reels. 
  Although it is not built out yet, there is a function planned to help users find Reels they may like. This will be done by searching for other users Reels that have the same movie in it. This will use the external_id to match similar movies.

