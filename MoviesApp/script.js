function submit() {
    let $title = $("#title").val();
    let $rating = $("#rating").val();
    // Making sure there is input in both fields,
    // the rating is between 0 and 10,
    // and the title is 2 or more characters
    if ((!$title || !$rating) || 
        ($rating < 0 || $rating > 10) ||
        ($title.length < 2)) {
            alert("invalid input");
            return;
    }

    // adding the table if it doesnt already exist
    const $content = $(".content");
    if ($content.find("table").length === 0) {
        $content.append("<br><div><table></table></div>");
    }

    // add inputs to the table
    let $movieList = $(".content table");
    $movieList.append("<tr><td>"+$title+"</td><td>"+$rating+"</td><td>&#10005</td></tr>");

    removeEntry();
}

// Event listener to remove an entry
function removeEntry() {
    $("td + td + td").on("click", function() {
        $(this).parent().remove();
    })
}

function sort() {

    // putting checkboxes into variables
    let $alphabetically = $("#sort1").prop("checked");
    let $lowToHigh = $("#sort2").prop("checked");
    let $highToLow = $("#sort3").prop("checked");

    // making array from table elements
    const tableElements = Array.from($("td"));
    let titles = [];
    let ratings = [];
    // Extracting titles and ratings into their own separate arrays
    tableElements.map((td, index) => {
        if (index % 3 == 0) {
            titles.push(td.innerText);
        }
        if ((index - 1) % 3 == 0) {
            ratings.push(td.innerText);
        }
    });

    // Making array of objects with titles and their associated ratings
    let entries = titles.map((title, index) => ({ title, rating: ratings[index] }));

    // Sorting entries array
    if ($alphabetically) {
        entries.sort((a, b) => a.title.localeCompare(b.title));
    }
    if($lowToHigh) {
        entries.sort((a, b) => a.rating - b.rating);
    }
    if($highToLow) {
        entries.sort((a, b) => (a.rating - b.rating)).reverse();
    }

    // Extracting sorted entries array into separate arrays
    titles = entries.map(item => item.title);
    ratings = entries.map(item => item.rating);

    // Emptying table and adding sorted elements
    let $movieList = $(".content table");
    $movieList.empty();
    for(let i = 0; i < titles.length; i++) {
        $movieList.append("<tr><td>"+titles[i]+"</td><td>"+ratings[i]+"</td><td>&#10005</td></tr>");
    }

    removeEntry();
}