# Study Companion

## Description
A web application designed for people who wants to practice and improve study habits. It utilizes a few study techniques such as forgetting everything, using pomodoro technique, feynman technique, and much more.

This project uses everything taught in the lecture  aside from react, because I am not comfortable using it. Both AJAX and Django was utilized in certain parts of the application. Lastly, techniques and methods were from studies, YouTube, people's opinion, and my personal experience.


## Distinctiveness and Complexity
This project does not have a networking feature nor a posting feature from project 4, but it uses some AJAX for updating data. This is very different an e-commerce website, no posting, listing, or buying feature. I used languages: HTML, CSS, JavaScript, Python and frameworks: Django, Django models, and bootstrap. This experience was very interesting because I had to look up past projects to help me with login and logout; it feels different doing everything from start. But I was able to make a project that utilizes all the things taught.

For the complexity, this project is just composed of some small features put into one. A to-do list/reminder uses local storage to store information. A timer for 25 minutes and 5 minutes afterwards, weirdly enough I didn't use date object of JavaScript in making these. Date object was only utilized in subtracting the hours between the day user opened the app and when he/she last opened that specific card. Lastly, is to somehow use JavaScript to make pages to the modal without going to the tip or introduction, I used data attribute to render specific page number. For boostrap, modal object and progress bar was utilized.

## Why I decided to build this
I could never find an app that for my type, and there were some apps that did better in certain parts. Though I admit I cannot create a web application that is as good as the ones that are avaiable today, so I decided to make it focus towards building a good study habit and methods. Originally, I was planning to add random little increments to the 25 minute timer to practice user's ability to focus. Additionally, I was also planning to add a stopwatch after the timer has stopped to see how much more have the user studied after the timer. But both of those seemed unnecessary or a small feature, there are other things that would be better to focus first.

## Files
This is a standard Django file system with 1 web application in a Django project. 

#### HTML
These are the HTML files in templates of this application:
- cards
- index
- layout
- login
- logout

2 pages were used aside from login and logout, 1 for flashcards, and another for the home page.

#### static
These are the static files in this application:
- beep.wav
    - beep.wav is used for alarm once the one session has finished
- cards.js
    - plain JavaScript file for flashcard page that:
        - checks all cards then changes the color based on how much time has passed since the user checked the definition
        - AJAX to update the date of the card in backend, but needs to refresh before the cards change to the appropriate color
- index.js
    - plain JavaScript file for home page that:
        - adds a bunch of functionalities to buttons and icons
        - gets goal of user in local storage
        - to do list in a bootstrap modal, also utilizes local storage
        - modal with 3 pages
            - **1st page** reminders for user, then opens a differnt modal
            - **2st page** timer for 25 minutes with a percentage bar
            - **3rd page** asks whether user wants to continue or not 
- styles.css
    - removed to-do list input outline for better experience

#### Django Models
Database models
    - user (absract user)
    - activities
        - user, date and duration/number of sessions
    - cards
        - acronym, definition, and last reviewed date


## How to run
cd into the project directory, then type `python3 manage.py runserver` in your terminal
