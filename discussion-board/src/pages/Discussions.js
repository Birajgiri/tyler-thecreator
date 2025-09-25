import React, { useState, useEffect } from 'react';
import { fetchDiscussions } from '../../../frontend/api';
import { editDiscussion, deleteDiscussion } from '../../../frontend/discussionApi';
import { Link } from 'react-router-dom';

const Discussions = () => {
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    const [discussions, setDiscussions] = useState([]);
    // Store user votes in local state (per session)
    const [userVotes, setUserVotes] = useState(() => {
        // Try to load from localStorage for persistence
        const saved = localStorage.getItem('discussionVotes');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const getDiscussions = async () => {
            const token = localStorage.getItem('authToken');
            const data = await fetchDiscussions(token);
            setDiscussions(data);
        };
        getDiscussions();
    }, []);

    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const handleEdit = (discussion) => {
        setEditId(discussion._id);
        setEditTitle(discussion.title);
        setEditContent(discussion.content);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await editDiscussion(editId, { title: editTitle, content: editContent }, token);
        setEditId(null);
        setEditTitle('');
        setEditContent('');
        const data = await fetchDiscussions(token);
        setDiscussions(data);
    };

    const handleDelete = async (discussionId) => {
        await deleteDiscussion(discussionId, token);
        const data = await fetchDiscussions(token);
        setDiscussions(data);
    };

    // Like/Dislike logic (per session, not persisted to backend)
    const handleVote = (discussionId, value) => {
        if (userVotes[discussionId]) return; // Already voted
        setUserVotes(prev => {
            const updated = { ...prev, [discussionId]: value };
            localStorage.setItem('discussionVotes', JSON.stringify(updated));
            return updated;
        });
        setDiscussions(prev => prev.map(d =>
            d._id === discussionId ? { ...d, likeCount: (d.likeCount || 0) + value } : d
        ));
    };

    return (
        <div>
            <h1>Discussions</h1>
            <Link to="/new-discussion">Post a new discussion</Link>
            <ul>
                {discussions.map(discussion => {
                    // Use likeCount from backend if present, else default to 0
                    const count = discussion.likeCount || 0;
                    const userVote = userVotes[discussion._id];
                    return (
                        <li key={discussion._id} style={{ marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #eee' }}>
                            <Link to={`/discussion/${discussion._id}`}>{discussion.title}</Link>
                            {discussion.author === currentUserId && (
                                <>
                                    <button onClick={() => handleEdit(discussion)}>Edit</button>
                                    <button onClick={() => handleDelete(discussion._id)}>Delete</button>
                                </>
                            )}
                            {editId === discussion._id && (
                                <form onSubmit={handleEditSubmit} style={{ marginTop: '8px' }}>
                                    <input
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                        placeholder="Edit title"
                                    />
                                    <input
                                        value={editContent}
                                        onChange={e => setEditContent(e.target.value)}
                                        placeholder="Edit content"
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                                </form>
                            )}
                            {/* Like/Dislike radio buttons */}
                            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <input
                                        type="radio"
                                        name={`vote-${discussion._id}`}
                                        disabled={!!userVote}
                                        onChange={() => handleVote(discussion._id, 1)}
                                    /> Like
                                </label>
                                <span style={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{count + (userVote || 0)}</span>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <input
                                        type="radio"
                                        name={`vote-${discussion._id}`}
                                        disabled={!!userVote}
                                        onChange={() => handleVote(discussion._id, -1)}
                                    /> Dislike
                                </label>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Discussions;
