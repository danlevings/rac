import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Filters extends Component {

    state = {
        categories: [
            {
                id: 1,
                name: 'Fireplaces',
                checked: false,
            },
            {
                id: 2,
                name: 'Vintage',
                checked: false,
            },
            {
                id: 3,
                name: 'Antiques',
                checked: false,
            },
            {
                id: 4,
                name: 'Furniture',
                checked: false,
            },
        ]
    }

    onClick = (id) => {
        const categories = { ...this.state.categories };
        const change = categories.find(x => x.id === id);
        change.checked = !change.checked;

        this.setState({
            categories
        });

        // TODO: on filter change
    }

    render() {
        return (
        <div>
            <h4>Categories</h4>
            {this.state.categories.map(c => (
                <div className='filter-checkbox' key={`category-${c.id}`} onClick={() => {}}>
                    <input type='checkbox' checked={c.checked} id={`category-${c.id}`}/>
                    <label htmlFor={`category-${c.id}`}>{c.name}</label>
                </div>
            ))}
            <h4>Tags</h4>
            {this.state.categories.map(c => (
                <div className='filter-checkbox' key={`tag-${c.id}`} onClick={() => {}}>
                    <input type='checkbox' checked={c.checked} id={`tag-${c.id}`}/>
                    <label htmlFor={`tag-${c.id}`}>{c.name}</label>
                </div>
            ))}
        </div>
        )
    }
}
