'use client';

import { useState, useEffect } from 'react';

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [modalView, setModalView] = useState('profile'); // 'profile', 'deploy', 'chat'
  const [incidents, setIncidents] = useState([]);
  const [messages, setMessages] = useState({}); // { volId: [msg] }
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    // Fetch Volunteers
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(data => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });

    // Fetch Incidents for Deployment
    fetch('/api/request')
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(e => console.error(e));
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim() || !selectedVolunteer) return;
    
    const volId = selectedVolunteer.id;
    const newMsg = { text: chatInput, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setMessages(prev => ({
      ...prev,
      [volId]: [...(prev[volId] || []), newMsg]
    }));
    
    setChatInput('');
    
    // Simulated Response
    setTimeout(() => {
      const responseMsg = { 
        text: `Copy that! I'm on standby for instructions in ${selectedVolunteer.location}.`, 
        sender: 'volunteer', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => ({
        ...prev,
        [volId]: [...(prev[volId] || []), responseMsg]
      }));
    }, 1500);
  };

  const filteredVolunteers = volunteers.filter(vol => 
    vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vol.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div style={{ padding: '2rem' }}>Loading Volunteers...</div>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Network Volunteers</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage and deploy your global responder network.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <input 
            type="text" 
            placeholder="Search by name or skill..." 
            className="search-bar"
            style={{ width: '280px', background: 'white', border: '1px solid var(--border-subtle)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="nav-item active" style={{ border: 'none', cursor: 'pointer', padding: '0.6rem 1rem' }}>
            <span>👥</span> Recruit
          </button>
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1 }}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', paddingBottom: '1rem' }}>
          {filteredVolunteers.map((vol, i) => (
            <div key={vol.id} className="bento-card" style={{ padding: '1.25rem', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#f1f5f9', overflow: 'hidden', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <img 
                    src={`/images/voluntreer%20${(i % 6) + 1}.jpeg`} 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vol.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Active Responder</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📍</span> {vol.location}
                </p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {vol.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="badge" style={{ background: '#f0f9ff', color: '#0369a1', fontSize: '0.65rem', border: '1px solid #e0f2fe' }}>{skill}</span>
                  ))}
                  {vol.skills.length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>+{vol.skills.length - 3} more</span>}
                </div>
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => {
                    setSelectedVolunteer({ ...vol, imgSrc: `/images/voluntreer%20${(i % 6) + 1}.jpeg` });
                    setModalView('profile');
                  }}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Profile
                </button>
                <button 
                   onClick={() => {
                    setSelectedVolunteer({ ...vol, imgSrc: `/images/voluntreer%20${(i % 6) + 1}.jpeg` });
                    setModalView('deploy');
                  }}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Footer */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', background: '#f8fafc', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <p style={{ fontSize: '0.8rem' }}><strong>{volunteers.length}</strong> Registered Volunteers</p>
        <span style={{ color: 'var(--border-subtle)' }}>|</span>
        <p style={{ fontSize: '0.8rem' }}><strong>{filteredVolunteers.length}</strong> Available in current view</p>
        <span style={{ color: 'var(--accent-success)', fontSize: '0.8rem', marginLeft: 'auto', fontWeight: 600 }}>● All systems operational</span>
      </div>

      {/* Volunteer Profile Modal */}
      {selectedVolunteer && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
          onClick={() => setSelectedVolunteer(null)}
        >
          <div 
            className="bento-card" 
            style={{ width: '100%', maxWidth: '700px', height: modalView === 'profile' ? 'fit-content' : '550px', maxHeight: '90vh', padding: 0, overflow: 'hidden', cursor: 'default', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', transition: 'height 0.3s' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ position: 'relative', height: '120px', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}>
              <button 
                onClick={() => setSelectedVolunteer(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
              >
                ✕
              </button>
              <div style={{ position: 'absolute', bottom: '-40px', left: '2rem', width: '80px', height: '80px', borderRadius: '20px', border: '4px solid white', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: '#f1f5f9' }}>
                <img src={selectedVolunteer.imgSrc} alt="PFP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setModalView('profile')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: modalView === 'profile' ? 'white' : 'rgba(255,255,255,0.2)', color: modalView === 'profile' ? 'var(--accent-primary)' : 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Profile</button>
                <button onClick={() => setModalView('deploy')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: modalView === 'deploy' ? 'white' : 'rgba(255,255,255,0.2)', color: modalView === 'deploy' ? 'var(--accent-primary)' : 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Deploy</button>
                <button onClick={() => setModalView('chat')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: modalView === 'chat' ? 'white' : 'rgba(255,255,255,0.2)', color: modalView === 'chat' ? 'var(--accent-primary)' : 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Message</button>
              </div>
            </div>

            <div style={{ padding: '3.5rem 2rem 2rem 2rem', height: 'calc(100% - 120px)', display: 'flex', flexDirection: 'column' }}>
              
              {/* PROFILE VIEW */}
              {modalView === 'profile' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{selectedVolunteer.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Verified Responder • ID:{selectedVolunteer.id}</p>
                    
                    <h4 style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Specialized Skills</h4>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {selectedVolunteer.skills.map((skill, i) => (
                        <span key={i} className="badge" style={{ background: '#f1f5f9', padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>{skill}</span>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                        <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>LOCATION</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.1rem' }}>{selectedVolunteer.location}</p>
                      </div>
                      <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                        <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>STATUS</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.1rem', color: 'var(--accent-success)' }}>Available</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Activity Stats</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Deployments</span>
                        <span style={{ fontWeight: 700 }}>24 Total</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Response Rate</span>
                        <span style={{ fontWeight: 700 }}>98%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Rating</span>
                        <span style={{ fontWeight: 700 }}>4.9/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEPLOY VIEW */}
              {modalView === 'deploy' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Deploy Responder</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Assign {selectedVolunteer.name} to an active crisis area.</p>
                  
                  <div className="scroll-area" style={{ flex: 1, background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-subtle)', padding: '0.5rem' }}>
                    {incidents.length > 0 ? incidents.map((inc, i) => (
                      <div key={i} className="incident-row" style={{ padding: '0.75rem', borderRadius: '8px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <div>
                          <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{inc.title}</p>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{inc.location} • {inc.urgency} Urgency</p>
                        </div>
                        <button 
                           onClick={() => {
                             alert(`Deployed ${selectedVolunteer.name} to ${inc.title}`);
                             setSelectedVolunteer(null);
                           }}
                          style={{ padding: '0.35rem 0.75rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>
                          Assign
                        </button>
                      </div>
                    )) : <p style={{ textAlign: 'center', padding: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No active incidents available.</p>}
                  </div>
                </div>
              )}

              {/* CHAT VIEW */}
              {modalView === 'chat' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="scroll-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem' }}>
                    <div style={{ alignSelf: 'center', background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Today, 12:44 PM
                    </div>
                    
                    {/* Simulated Greeting */}
                    <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '0.75rem', background: '#f1f5f9', borderRadius: '0 12px 12px 12px', fontSize: '0.8rem' }}>
                      Hello! I'm ready to assist. Where am I needed?
                    </div>

                    {/* Chat Messages */}
                    {(messages[selectedVolunteer.id] || []).map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '0.75rem', background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f1f5f9', color: msg.sender === 'user' ? 'white' : 'var(--text-main)', borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '0 12px 12px 12px', fontSize: '0.8rem', position: 'relative' }}>
                        {msg.text}
                        <span style={{ display: 'block', fontSize: '0.6rem', opacity: 0.7, marginTop: '0.2rem', textAlign: 'right' }}>{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      style={{ flex: 1, border: 'none', padding: '0.5rem', fontSize: '0.85rem', outline: 'none' }}
                    />
                    <button 
                      onClick={handleSendMessage}
                      style={{ padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}


