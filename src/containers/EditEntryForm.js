import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../history.js'
import HOCWithAuth from '../components/HOCWithAuth.js'

class EditEntryForm extends Component {
    state = {
        title: '',
        genre: '',
        description: '',
        content: '',
        published: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.updateEntry(this.state)
    }

    componentDidMount = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}`
                .concat('/api/v1/entries/')
                .concat(`${this.props.match.params.id}`)
        )
            .then((res) => res.json())
            .then((entry) => {
                this.props.setCurrentEntry(entry)
                this.setState({
                    title: entry.title,
                    genre: entry.genre,
                    description: entry.description,
                    content: entry.content,
                    published: entry.published,
                })
            })
    }

    updateEntry = (entry) => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}`
                .concat('/api/v1/entries/')
                .concat(`${this.props.currentEntry.id}`),
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: entry.title,
                    genre: entry.genre,
                    description: entry.description,
                    content: entry.content,
                    published: entry.published,
                }),
            }
        )
            .then((res) => res.json())
            .then((newEntry) => {
                this.props.updateEntryInfo(newEntry)
            })
        history.push('/entries')
    }

    deleteEntry = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}`
                .concat('/api/v1/entries/')
                .concat(`${this.props.currentEntry.id}`),
            {
                method: 'DELETE',
            }
        )
        this.props.removePostFromUser(this.props.currentEntry.id)
        history.push('/entries')
    }

    render() {
        if (!this.props.currentUser || !this.props.currentEntry) {
            return <h1>Loading...</h1>
        } else if (this.props.currentEntry.status === 404) {
            alert('This is not a valid entry.')
            this.props.setCurrentEntry(null)
            history.push('/about')
            return null
        } else if (this.props.currentUser && this.props.currentEntry.user) {
            if (this.props.currentUser.id !== this.props.currentEntry.user.id) {
                alert('You do not have access to this page!')
                this.props.setCurrentEntry(null)
                history.push('/about')
                return null
            } else {
                return (
                    <div
                        className="ui raised card"
                        style={{
                            width: '48%',
                            minWidth: '50em',
                            position: 'relative',
                            left: '26%',
                            padding: '3em',
                            height: '43em',
                        }}
                    >
                        <div
                            className="ui attached message"
                            style={{
                                position: 'relative',
                                bottom: '1em',
                                textAlign: 'center',
                            }}
                        >
                            <div className="header">
                                <h2>Edit Your Story Details Here!</h2>
                            </div>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="ui form">
                                <div className="required field">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        onChange={this.handleChange}
                                        value={this.state.title}
                                        required
                                    />
                                </div>
                                <div className="required field">
                                    <label>Genre</label>
                                    <select
                                        onChange={this.handleChange}
                                        name="genre"
                                        value={this.state.genre}
                                        required
                                    >
                                        <option label="Genre"></option>
                                        <option value="adventure">
                                            Adventure
                                        </option>
                                        <option value="comedy">Comedy</option>
                                        <option value="drama">Drama</option>
                                        <option value="dungeons-and-dragons">
                                            Dungeons & Dragons
                                        </option>
                                        <option value="fantasy">Fantasy</option>
                                        <option value="historical-fiction">
                                            Historical Fiction
                                        </option>
                                        <option value="horror">Horror</option>
                                        <option value="mystery">Mystery</option>
                                        <option value="non-fiction">
                                            Non-Fiction
                                        </option>
                                        <option value="romance">Romance</option>
                                        <option value="science-fiction">
                                            Science Fiction
                                        </option>
                                        <option value="western">Western</option>
                                        <option value="other">Other</option>
                                    </select>
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
                                <div className="required field">
                                    <label>
                                        Published? (Visible to Others)
                                    </label>
                                    <select
                                        onChange={this.handleChange}
                                        name="published"
                                        value={this.state.published}
                                        required
                                    >
                                        <option label="Published? (Visible to Others)"></option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>
                                <button
                                    className="ui button"
                                    style={{
                                        position: 'relative',
                                        left: '42.5%',
                                        top: '1.5em',
                                    }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div
                            className="button-div"
                            style={{ position: 'absolute', top: '80%' }}
                        >
                            <Link
                                to={`/storyboards/${this.props.currentEntry.id}`}
                            >
                                <button
                                    style={{
                                        position: 'relative',
                                        top: '4.25em',
                                        left: '2.5%',
                                    }}
                                    className="ui button blue"
                                >
                                    Return to Storyboard
                                </button>
                            </Link>
                            <button
                                className="ui button red"
                                style={{
                                    position: 'relative',
                                    top: '4.25em',
                                    left: '100%',
                                }}
                                onClick={(e) => {
                                    if (
                                        window.confirm(
                                            'Are you sure you wish to delete this entry? This cannot be undone.'
                                        )
                                    )
                                        this.deleteEntry(e)
                                }}
                            >
                                Delete Entry
                            </button>
                        </div>
                    </div>
                )
            }
        } else {
            return null
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentEntry: (entry) => {
            dispatch({ type: 'SET_CURRENT_ENTRY', payload: entry })
        },
        updateEntryInfo: (entry) => {
            dispatch({ type: 'UPDATE_ENTRY_INFO', payload: entry })
        },
        removePostFromUser: (entryId) => {
            dispatch({ type: 'REMOVE_POST_FROM_USER', payload: entryId })
        },
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentEntry: state.currentEntry,
    }
}

export default HOCWithAuth(
    connect(mapStateToProps, mapDispatchToProps)(EditEntryForm)
)
