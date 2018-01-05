import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
/**
 * COMPONENT
 */
export class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    
    //top stories api
    axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=77a86ee91f6742a1a408589056538577')
      .then(res => {
        //sending title and abstract for sentiment analysis (minus the daily recaps)
        res.data.results.slice(2).map(article => {
          axios.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyCqlZZ_b-8IprpVImEEU98djUBHKRZvBEM', {
            document: {
              content: article.title + '. ' + article.abstract,
              type: 'PLAIN_TEXT',
            }
          })
            .then(googleRes => {
              console.log('Running')
              this.setState({
                articles: [...this.state.articles, { title: article.title, abstract: article.abstract, image: article.multimedia[4].url, url: article.url, ...googleRes.data.documentSentiment }]
              })
            })
        })
      })




  }

  render() {
    //sorting
    let articles = this.state.articles.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    })
    //priority
    articles.forEach(article => {
      this.props.priority.forEach(priorityElem => {
        if (article.title.concat(article.abstract).toLowerCase().includes(priorityElem.toLowerCase())) {
          article.priority = true;
        }
      })
    })

    const priorityArticles = articles.filter(article => {
      return article.priority
    })

    const nonPriorityArticles = articles.filter(article => {
      return !article.priority
    })

    articles = priorityArticles.concat(nonPriorityArticles)

    console.log('articles: ', articles)

    return (
      <div className="col-7 newsfeed">
        {
          articles.map(article => {
            let smiley;
            if (article.score > 0.6) {
              smiley = "/images/smiley1.jpg"
            }
            else if (article.score > 0.3) {
              smiley = "/images/smiley3.jpg"
            }
            else if (article.score > 0) {
              smiley = "/images/smiley2.jpg"
            }
            else if (article.score > -0.3) {
              smiley = "/images/smiley5.jpg"
            }
            else {
              smiley = "/images/smiley4.jpg"
            }

            //filtering
            if (
              !this.props.filter.map(filterElem => {
                if (article.title.concat(article.abstract).toLowerCase().includes(filterElem.toLowerCase())) {
                  return true;
                }
                return false;
              }).includes(true)
            ) {

              return (
                <div className="article" key={article.title}>
                  <img src={article.image} width="530" />
                  <div className="row">
                    <div className="col-10">
                      <a href={article.url}>
                        <h5>{article.title}</h5>
                      </a>
                      <h6>{article.abstract}</h6>
                    </div>
                    <span className="col">
                      <img src={smiley} height="40" />
                    </span>

                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    filter: state.filter,
    priority: state.priority
  }
}

export default connect(mapState)(Feed)

