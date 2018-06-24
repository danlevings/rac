import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Filters extends Component {

    state = {
        categories: [],
        tags: [],
    }

    componentDidMount = () => {
        this.mapItemsToState();
    }

    componentDidUpdate = (nextProps) => {
        if (nextProps.tags.length !== this.props.tags.length && nextProps.categories.length !== this.props.categories.length) {
            this.mapItemsToState();
        }
    }

    mapItemsToState = () => {
        const { categories, tags } = this.props;
        console.log('mapping', categories, tags);
        const mappedCategories = categories.map((c, i) => ({ name: c, checked: false }));
        const mappedTags = tags.map((c, i) => ({ name: c, checked: false }));

        this.setState({
            categories: mappedCategories,
            tags: mappedTags,
        })
    }

    onCategoryClick = e => {
        const name = e.target.id;
        const categories = [ ...this.state.categories ];
        const change = categories.find(x => x.name === name);
        if (change) {
            change.checked = !change.checked;
            this.setState({
                categories
            });
        }
        
        this.props.onFilterChange(this.getCurrentFilters());
    }

    onTagClick = e => {
        const name = e.target.id;
        const tags = [ ...this.state.tags ];
        const change = tags.find(x => x.name === name);
        if (change) {
            change.checked = !change.checked;
            this.setState({
                tags
            });
        }

        this.props.onFilterChange(this.getCurrentFilters());
    }

    getCurrentFilters = () => {
        const { categories, tags } = this.state;
        let selectedCategories = categories.filter(x => x.checked);
        let selectedTags = tags.filter(x => x.checked);

        selectedCategories = selectedCategories.reduce((a, b) => [...a, b.name], []);
        selectedTags = selectedTags.reduce((a, b) => [...a, b.name], []);

        return [...selectedCategories, ...selectedTags];

    }

    render() {
        return (
        <div>
            <h4>Categories</h4> 
            {this.state.categories.map(c => (
                <div className='filter-checkbox' key={c.name}>
                    <input type='checkbox' checked={c.checked} id={c.name} onClick={this.onCategoryClick}/>
                    <label htmlFor={c.name}>{c.name}</label>
                </div>
            ))}
            <h4>Tags</h4>
            {this.state.tags.map(c => (
                <div className='filter-checkbox' key={c.name}>
                    <input type='checkbox' checked={c.checked} id={c.name} onClick={this.onTagClick}/>
                    <label htmlFor={c.name}>{c.name}</label>
                </div>
            ))}
        </div>
        )
    }
}
