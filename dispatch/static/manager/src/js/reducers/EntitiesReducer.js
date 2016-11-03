import R from 'ramda'
import * as types from '../constants/ActionTypes'

const initialState = {
  articles: {},
  article: {},
  sections: {},
  images: {},
  image: {},
  persons: {}
}

export default function entitiesReducer(state = initialState, action) {
  switch (action.type) {

    // Articles
    case types.FETCH_ARTICLES + '_PENDING':
      return R.merge(state, {
        articles: {}
      })
    case types.FETCH_ARTICLES + '_FULFILLED':
      return R.merge(state, {
        articles: R.merge(state.articles, action.payload.results.entities.articles)
      })

    // Article
    case types.FETCH_ARTICLE + '_PENDING':
      return R.merge(state, {
        article: {}
      })
    case types.FETCH_ARTICLE + '_FULFILLED':
    case types.SET_ARTICLE:
      return R.merge(state, {
        articles: R.merge(state.articles, action.payload.entities.articles),
        article:  R.merge(state.article, action.payload.entities.articles)
      })

    // Sections
    case types.FETCH_SECTIONS + '_FULFILLED':
      return R.merge(state, {
        sections: R.merge(state.sections, action.payload.entities.sections)
      })

    // Images
    case types.FETCH_IMAGES + '_FULFILLED':
      return R.merge(state, {
        images:  R.merge(state.images, action.payload.results.entities.images),
        persons: R.merge(state.persons, action.payload.results.entities.persons)
      })
    case types.SAVE_IMAGE + '_FULFILLED':
      return R.merge(state, {
        images: R.merge(state.images, action.payload.entities.images),
        image: R.merge(state.image, action.payload.entities.images)
      })

    // Image
    case types.SELECT_IMAGE:
      let image = state.images[action.imageId]
      return R.merge(state, {
        image: R.assoc(action.imageId,image, {})
      })
    case types.UPDATE_IMAGE:
      return R.merge(state, {
        image: R.merge(state.image, action.payload.entities.images)
      })

    // Persons
    case types.FETCH_PERSONS + '_FULFILLED':
      return R.merge(state, {
        persons: R.merge(state.persons, action.payload.results.entities.persons)
      })
    case types.CREATE_PERSON + '_FULFILLED':
      return R.merge(state, {
        persons: R.merge(state.persons, action.payload.entities.persons)
      })

    default:
      return state
  }
}
