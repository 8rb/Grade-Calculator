# Grade Calculator

<a  href="https://soybika.netlify.app/"  target="_blank"><img  style="display:inline-block"  alt="Logo"  height="100px"  src="https://raw.githubusercontent.com/8rb/Grade-Calculator/master/public/favicon.png?raw=true" /></a>

This repo is a _*grade calculator*_ web application made with **React 17** and React Hooks. For styling the chosen library was _*styled-components*_ and the main language for development was TypeScript.

This web app is based on peruvian grading system where grades go from zero to twenty.

| Peruvian    |   0% - 100%  |
| ----------- | -----------  |
| 0           |  0%          |
| 5           |  25%         |
| 10          |  50%         |
| 15          |  75%         |
| 20          |  100%        |

## Why?

As a university student, I have found that every semester I manually calculate the grades I need in order to pass a course or to get a certain grade (for the scholarship you need more than 17 approximately). So I figured that creating a web app that can automate this process and make it much easier would be very helpful for most of the Peruvian students since the calculators that I have found do not work with this grading system.

## How does it work?

The idea is to get all the grades that the student has gotten so far, and calculate the grade the student needs to pass the course. 

The grade needed to pass a course in Peru depends on the university, but it is between 10.5 (52.5%) and 12.5 (62.5%) for most universities. For that reason, I included a textbox where the student can put the grade they need to pass.

The **grade input**, which you can find on the left of any of the colored rectangles, is validated using this constraints, which means that you can only input a number between 0 to 20.

On the other hand, the constraints for the weight (%) of each grade will always have to be greater than zero and less than 100% minus the accumulated weight of all the grades that the user has inputted.

Moreover, I added some simple buttons to add or remove grades, in case the user has a lot of grades in a certain course. These buttons make the UI very _*friendly and simple*_ to use.

Finally, to know precisely the grade you need to pass a defined course, you have to click the blue bottom below, and the results will appear on a modal in the center of the screen. As a detail, I put a message in the modal that changes based on the needed grade to pass. This detail gives the UX a bit more personality and makes the app more pleasant and even funny to use.