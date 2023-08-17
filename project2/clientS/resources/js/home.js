window.onload = (() => {
    const BASE_URL = 'http://localhost:3001';

    const userImage = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'


    const tweetsContainer = document.querySelector(".feed");

    const searchResultsContainer = document.querySelector(".searchResults");

    //post tweet
    const form = document.getElementById("tweetForm")
    form.addEventListener("submit", async function (event) {

        event.preventDefault()
        const token = localStorage.getItem("token")
        await fetch(BASE_URL + '/tweets', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tweet: form.elements.tweet.value })
        })

        location.reload()


    })


    async function getAllTweets() {
        const token = localStorage.getItem("token")

        const response = await fetch(BASE_URL + '/tweets',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const allTweets = await response.json();
        populateTweets(allTweets.tweets);


        const dummyTweets = [
            {
                id: '123',
                userName: 'Professor',
                tweet: 'Practice! Practice!!',
                userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
            },
            {

                id: '233',
                userName: 'Adisu',
                tweet: 'Yes',
                userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
            }
        ];
        // populateTweets(dummyTweets);

    }

    function populateTweets(allTweets) {
        let tweetSectionTemplate = document.querySelector('.postTemplate');

        allTweets.forEach((tweet) => {
            let tweetSection = tweetSectionTemplate.cloneNode(true); // 
            tweetSection.classList.remove('d-none'); //remove display none of cloned one

            tweetSection.querySelector('.tweet_user_image').src = userImage;
            tweetSection.querySelector('.tweet_username').innerHTML = tweet.userId.firstname;
            tweetSection.querySelector('.tweet_para').innerHTML = tweet.tweet;
            tweetSection.querySelector('.tweet_date').innerHTML = new Date(tweet.postedDate).toLocaleString();

            tweetsContainer.appendChild(tweetSection);

        });
    }

    getAllTweets().then();   //calling getAllTweets. 


    // //taking to search bar when clicking search on left

    // document.getElementById("scrollAndFocusButton").addEventListener("click", function () {
    //     // Get the target element (search bar)
    //     const searchBar = document.getElementById("searchBar");

    //     // Scroll to the target element
    //     searchBar.scrollIntoView({ behavior: "smooth" });

    //     // Focus on the search bar to enable typing
    //     searchBar.focus();
    // });


    let searchField = document.querySelector('.searchField');
    let resultsSection = document.querySelector('.searchResults');

    searchField.addEventListener('keyup', function (event) {
        getSearchResults(event.target.value).then(r => {
        });                                                         //(event.target.value gives the value of whatever is pressed after key)
        if (event.target.value === '') {
            searchResultsContainer.innerHTML = ''
        }
    });



    function populateSearchResults(filteredResults) {
        searchResultsContainer.innerHTML = '';
        filteredResults.forEach((user) => {
            let username = user.firstname;
            let lastname = user.lastname;

            let following = user.following;

            const resultElement = document.createElement("div");
            resultElement.classList.add("searchResult");
            resultElement.textContent = username + " " + lastname;

            const followButton = document.createElement("button");

            followButton.textContent = following === true ? "Unfollow" : "Follow";
            followButton.classList.add("followButton");

            resultElement.appendChild(followButton);
            searchResultsContainer.appendChild(resultElement);

            // Adding event listener to handle follow/unfollow actions
            followButton.addEventListener("click", () => {
                if (followButton.textContent === "Follow") {
                    followButton.textContent = "Unfollow";
                    console.log(`Following ${username}`);
                    followUser(username).then();

                    //Need to write code to change follow/unfollow status in backend. 


                } else if (followButton.textContent === "Unfollow") {
                    followButton.textContent = "Follow";
                    console.log(`Unfollowing ${username}`);
                    unfollowUser(username).then();
                }
            });
        });
    }


    async function getSearchResults(searchKeyword) {
        // const response = await fetch(BASE_URL + '/tweet_users?search=' + searchKeyword,
        //   {
        //       headers: {
        //           'Content-Type': 'application/json'
        //       }
        //   });
        // const filteredUsers = await response.json();
        // populateSearchResults(filteredUsers);


        // const dummySearchResults = [
        //     {
        //         username: 'User A',
        //         following: false
        //     },
        //     {
        //         username: 'User B',
        //         following: true
        //     },
        //     {
        //         username: 'User C',
        //         following: false
        //     }
        // ];

        if (searchKeyword != "") {
            const token = localStorage.getItem("token")

            const response = await fetch(BASE_URL + '/users/search?username=' + searchKeyword,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            const users = await response.json();
            console.log("users", users)
            populateSearchResults(users);
        }


        // call backend to get search results.
        // return dummySearchResults;
    }



});
