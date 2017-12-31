import React from 'react'
import R from 'ramda'

import Dropdown from '../../Dropdown'

import TextInput from '../TextInput'

import SortableList from '../SortableList'


function Item(props) {
  if (props.isSelected) {
    return (
      <li
        className='o-dropdown-list__item o-dropdown-list__item--selected'
        onClick={props.onClick}>
        <span className='o-dropdown-list__item__icon pt-icon-standard pt-icon-small-tick'></span>
        <span className='o-dropdown-list__item__text'>{props.text}</span>
        <span className='o-dropdown-list__item__icon pt-icon-standard pt-icon-cross'></span>
      </li>
    )
  } else {
    return (
      <li
        className='o-dropdown-list__item'
        onClick={props.onClick}>
        <span className='o-dropdown-list__item__icon'></span>
        <span className='o-dropdown-list__item__text'>{props.text}</span>
        <span className='o-dropdown-list__item__icon'></span>
      </li>
    )
  }
}

class ItemSelectInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    this.fetchResults()
  }

  handleInputChange(e) {
    e.preventDefault()
    this.setState(
      { query: e.target.value },
      this.fetchResults
    )
  }

  fetchResults() {
    setTimeout(() => this.props.fetchResults(this.state.query), 1)
  }

  addValue(id) {
    if (this.props.many) {
      this.props.onChange(
        R.append(id, this.getSelected())
      )
    } else {
      this.props.onChange(id)
    }

    this.closeDropdown()
  }

  removeValue(id) {
    const selected = this.getSelected()

    if (this.props.many) {
      this.props.onChange(
        R.remove(
          R.findIndex(R.equals(id), selected),
          1,
          selected
        )
      )
    } else {
      this.props.onChange(null)
    }
  }

  closeDropdown() {
    this.refs.dropdown.close()
    this.setState({ query: '' })
  }

  getSelected() {
    return this.props.many ? (this.props.selected || []) : (this.props.selected ? [this.props.selected] : [])
  }

  isNotSelected(id) {
    return !R.contains(id, this.getSelected())
  }

  renderNoResults() {
    return (
      <li className='o-dropdown-list__no-results'>No results</li>
    )
  }

  renderDropdown() {
    const selected = this.getSelected()
      .filter(id => this.props.entities[id])
      .map(id => this.props.entities[id])
      .filter(item => item)
      .map(item => (
        <Item
          key={item.id}
          isSelected={true}
          text={item[this.props.attribute]}
          onClick={() => this.removeValue(item.id)} />
        ))

    const results = this.props.results
      .filter(id => this.isNotSelected(id))
      .map(id => this.props.entities[id])
      .map(item => (
        <Item
          key={item.id}
          isSelected={false}
          text={item[this.props.attribute]}
          onClick={() => this.addValue(item.id)} />
      ))

    const createButton = this.props.create ? (
      <button
        className='pt-button c-input--item-select__search__button'
        onClick={() => this.props.create(this.state.query, data => this.addValue(data.id))}>
        Add
      </button>
    ) : null

    return (
      <div className='c-input--item-select__dropdown'>
        <div className='c-input--item-select__search'>
          <div className='pt-control-group'>
            <TextInput
              onChange={e => this.handleInputChange(e)}
              value={this.state.query}
              fill={true}
              placeholder='Search' />
              {createButton}
          </div>
        </div>
        <ul className='o-dropdown-list'>
          {selected.length ? selected : null}
          {results.length ? results : this.renderNoResults()}
        </ul>
      </div>
    )
  }

  renderSortableList() {
    return (
      <SortableList
        items={this.getSelected()}
        entities={this.props.entities}
        onChange={selected => this.props.onChange(selected)}
        renderItem={item => (
          <div className='c-input--item-select__item'>{item[this.props.attribute]}</div>
        )} />
    )
  }

  render() {
    const anchor = (
      <a onClick={() => this.refs.dropdown.open()}>
        {this.props.editMessage}
      </a>
    )

    const filterButton = (
      <div>
        <div className='pt-control-group'>
          <button className={`pt-button pt-icon-${this.props.filterIcon}`}>
            {this.props.filterLabel}
          </button>
          <button
            className='pt-button c-item-list__header__filters__filter'
            onClick={() => this.refs.dropdown.open()}>
            {this.props.editMessage}
            <span className='pt-icon-standard pt-icon-caret-down pt-align-right'></span>
          </button>
        </div>
      </div>
    )

    return (
      <div
        className='c-input c-input--item-select'>
        {this.props.showSortableList ? this.renderSortableList() : null }
        <Dropdown
          ref='dropdown'
          content={this.renderDropdown()}
          inline={this.props.inline}>
          {this.props.filterButton ? filterButton : anchor}
        </Dropdown>
      </div>
    )
  }
}

ItemSelectInput.defaultProps = {
  many: true,
  results: [],
  entities: {},
  showSortableList: true,
  inline: true
}

export default ItemSelectInput