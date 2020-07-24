const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var totalLikes = 0
    
    blogs.forEach(element => {
        totalLikes += element.likes
    });
    
    return totalLikes
}

const favoriteBlog = (blogs) => {
    mostLikes = blogs[0]
    for (var key in blogs){
        var likes = blogs[key].likes
        if (likes > mostLikes.likes){
            mostLikes = blogs[key]
        }
    }
    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}