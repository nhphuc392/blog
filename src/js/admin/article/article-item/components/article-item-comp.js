import React, { Component } from "react"
import { connect } from "react-redux"

class ArticleItemComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      textAreaId : "update-article-description",
      title: ""
    }
  }

  componentDidMount(){
    let { dispatch, id } = this.props
    dispatch ( hxltinh.actions.article._instance.fetchItemIfNeeded(id) )
  }

  render() {

    let TextAreaComp = window.hxltinh.globalComponents.TextAreaComp

    return (
      <div>
        { ( () => {
          if( typeof( this.props.item.id ) !== "undefined" ){
            console.log('this.props.item :', this.props.item );
            return (
              <div>
                <div>Title</div>
                <input value={ this.state.title } onChange={ this.handleTitle.bind(this) } type="text" id="article-title" className="article-title" />
                <div>Description</div>
                <TextAreaComp content={ this.props.item.description } textAreaId={ this.state.textAreaId } />
                <button className="button" onClick={this.updateArticle.bind(this)}>Update</button>
              </div>
            )
          }else { return ( <div></div> ) }
        })()}
      </div>
    )
  }

  updateArticle() {

    let { dispatch, item } = this.props

    dispatch( hxltinh.actions.article._instance.updateItem({
      id: item.id,
      title: this.state.title,
      description: encodeURI(tinyMCE.get( this.state.textAreaId ).getContent()),
      slug: "some-slug"
    }))
  }
  handleTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  componentWillReceiveProps(nextProps){

    this.setState( { title : nextProps.item.title } )
  }

}

const mapStateToProps = (state) => {
  console.log('state.article.get("singleItem").toJS():', state.article.get("singleItem").toJS());
  return {
    item: state.article.get("singleItem").toJS()
  }
}

export default connect(mapStateToProps)(ArticleItemComp)
