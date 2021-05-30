import React from 'react'
import { connect } from 'react-redux'
import history from '../history.js'
class CreateCharacterForm extends React.Component {
    state = {
        name: '',
        description: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.createCharacter(this.state)
    }

    createCharacter = (info) => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}`.concat('/api/v1/characters'),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                },
                body: JSON.stringify({
                    name: info.name,
                    description: info.description,
                    entry_id: `${this.props.currentEntry.id}`,
                }),
            }
        )
            .then((response) => response.json())
            .then((character) => {
                this.props.addCharacterToEntry(character)
                history.push(
                    '/storyboards/'.concat(`${this.props.currentEntry.id}`)
                )
            })
    }

    render() {
        return (
            <div>
                <h1 style={{ position: 'relative', right: '12.5%' }}>
                    Add a New Character
                </h1>
                <img
                    alt=""
                    src={'/icons/character.png'}
                    style={{
                        position: 'absolute',
                        bottom: '87%',
                        left: '77.5%',
                        height: '4em',
                    }}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className="ui form">
                        <div className="required field">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                                maxLength="32"
                                required
                            />
                        </div>
                        <div className="required field">
                            <label>Description</label>
                            <textarea
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                required
                            ></textarea>
                        </div>
                        <button
                            className="ui button"
                            style={{ position: 'relative', top: '1.5em' }}
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        currentEntry: state.currentEntry,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCharacterToEntry: (character) => {
            dispatch({ type: 'ADD_CHARACTER_TO_ENTRY', payload: character })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacterForm)
