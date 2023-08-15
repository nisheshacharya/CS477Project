document.addEventListener("DOMContentLoaded", function () {
    // Code to handle interactions and dynamic behavior on the user page
  
    // Code to fetch and display user's tweets
    const tweetsContainer = document.querySelector(".tweets");
  
    // Replace this with actual code to fetch and display tweets dynamically
    const dummyTweets = [
      "This is tweet 1",
      "This is tweet 2",
      "This is tweet 3",
    ];
  
    dummyTweets.forEach((tweetText) => {
      const tweetElement = document.createElement("div");
      tweetElement.classList.add("tweet");
      tweetElement.textContent = tweetText;
      tweetsContainer.appendChild(tweetElement);
    });
  
    // Code to fetch and display search results
    const searchResultsContainer = document.querySelector(".searchResults");
  
    // code to fetch and disply search results dynamically. also need to add function to display more while scrolling

    const dummySearchResults = ["User A", "User B", "User C"];
  
    dummySearchResults.forEach((username) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("searchResult");
        resultElement.textContent = username;
    
        const followButton = document.createElement("button");
        followButton.textContent = "Follow";
        followButton.classList.add("followButton");
    
        resultElement.appendChild(followButton);
        searchResultsContainer.appendChild(resultElement);
    
        // Add event listener to handle follow/unfollow actions
        followButton.addEventListener("click", () => {
          if (followButton.textContent === "Follow") {
            followButton.textContent = "Unfollow";
            // Replace with code to handle follow action
            console.log(`Following ${username}`);
          } else if (followButton.textContent === "Unfollow") {
            followButton.textContent = "Follow";
            // Replace with code to handle unfollow action
            console.log(`Unfollowing ${username}`);
          }
        });
      });
    });
    
  