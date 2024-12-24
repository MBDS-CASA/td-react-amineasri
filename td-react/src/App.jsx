import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

function MainContent(props) {
    return (
        <p>Bonjour, on est le {props.jour}, {props.mois}, {props.anne} et il est {props.heure}:{props.min}:{props.sec}</p>
    );
}

function ItemDisplay({ item }) {
    return (
        <div className="item-container">
            <h2>Course: {item.course}</h2>
            <p>Student: {item.student.firstname} {item.student.lastname}</p>
            <p>Grade: {item.grade}</p>
            <p>Date: {item.date}</p>
        </div>
    );
}

function Foot(props) {
    return (
        <footer style={{ textAlign: 'center', bottom: 0, width: '100%' }}>
            Tous droits réservés ©{props.anne} - {props.nom} {props.prenom}
        </footer>
    );
}

function Header() {
    return (
        <header>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_universit%C3%A9_c%C3%B4te_azur.png"} alt="Image" style={{ width: 'auto', height: '100px' }} />
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
}

function NavigationMenu({ isMenuOpen, handleClick }) {
    return (
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><button onClick={() => handleClick('Notes')} style={{ background: 'transparent', color: '#ebe7ef', border: 'none', cursor: 'pointer' }}>Notes</button></li>
                <li><button onClick={() => handleClick('Etudiants')} style={{ background: 'transparent', color: '#ebe7ef', border: 'none', cursor: 'pointer' }}>Etudiants</button></li>
                <li><button onClick={() => handleClick('Matières')} style={{ background: 'transparent', color: '#ebe7ef', border: 'none', cursor: 'pointer' }}>Matières</button></li>
                <li><button onClick={() => handleClick('A propos')} style={{ background: 'transparent', color: '#ebe7ef', border: 'none', cursor: 'pointer' }}>A propos</button></li>
            </ul>
        </nav>
    );
}

function HamburgerButton({ onClick }) {
    return (
        <div className="hamburger" onClick={onClick}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
}
function StudentsTable({ data, currentSection }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterData = (data) => {
        if (!searchQuery) return data;
        return data.filter((item) => {
            const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
            const courseName = item.course.toLowerCase();
            const grade = item.grade ? item.grade.toString().toLowerCase() : '';
            const date = item.date.toLowerCase();

            return (
                fullName.includes(searchQuery.toLowerCase()) ||
                courseName.includes(searchQuery.toLowerCase()) ||
                grade.includes(searchQuery.toLowerCase()) ||
                date.includes(searchQuery.toLowerCase())
            );
        });
    };

    const filteredData = filterData(data);
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            {/* Search Bar Styling */}
            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '300px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                />
            </div>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="Students Table">
                    <TableHead>
                        <TableRow>
                            {currentSection === 'Etudiants' && <TableCell>First Name</TableCell>}
                            {currentSection === 'Etudiants' && <TableCell>Last Name</TableCell>}
                            {currentSection === 'Notes' && <TableCell>First Name</TableCell>}
                            {currentSection === 'Notes' && <TableCell>Last Name</TableCell>}
                            {currentSection === 'Notes' && <TableCell>Course</TableCell>}
                            {currentSection === 'Notes' && <TableCell>Grade</TableCell>}
                            {currentSection === 'Matières' && <TableCell>Course</TableCell>}
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => (
                            <TableRow key={index}>
                                {currentSection === 'Etudiants' && (
                                    <TableCell>{item.student.firstname}</TableCell>
                                )}
                                {currentSection === 'Etudiants' && (
                                    <TableCell>{item.student.lastname}</TableCell>
                                )}
                                {currentSection === 'Notes' && (
                                    <TableCell>{item.student.firstname}</TableCell>
                                )}
                                {currentSection === 'Notes' && (
                                    <TableCell>{item.student.lastname}</TableCell>
                                )}
                                {currentSection === 'Notes' && <TableCell>{item.course}</TableCell>}
                                {currentSection === 'Notes' && <TableCell>{item.grade}</TableCell>}
                                {currentSection === 'Matières' && <TableCell>{item.course}</TableCell>}
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}





function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [randomItem, setRandomItem] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched data:', data);
                setData(data);
                setRandomItem(getRandomItem(data));
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    }, []);

    function getRandomItem(data) {
        if (!data || data.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    }

    const currentDate = new Date();
    const jour = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    const mois = currentDate.toLocaleDateString('fr-FR', { month: 'long' });
    const anne = currentDate.getFullYear();
    const heure = currentDate.getHours().toString().padStart(2, '0');
    const min = currentDate.getMinutes().toString().padStart(2, '0');
    const sec = currentDate.getSeconds().toString().padStart(2, '0');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClick = (item) => {
        setCurrentSection(item);
        setIsMenuOpen(false);
    };

    return (
        <>
            <Header />
            <HamburgerButton onClick={toggleMenu} />
            <NavigationMenu isMenuOpen={isMenuOpen} handleClick={handleMenuClick} />
            <MainContent
                jour={jour}
                mois={mois}
                anne={anne}
                heure={heure}
                min={min}
                sec={sec}
            />
            <div>
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Emsi + mbds</h1>
            <div className="card">
                <button onClick={() => setCount(count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <button onClick={() => setRandomItem(getRandomItem(data))}>Tirer un élément aléatoire</button>
            {randomItem && <ItemDisplay item={randomItem} />}

            {currentSection && (
                <div className="current-section">
                    <h2>Vous actuellement dans la section {currentSection}</h2>
                </div>
            )}

            {data.length > 0 && <StudentsTable data={data} currentSection={currentSection} />}
            <Foot anne={anne} nom={"Asri"} prenom={"Mohamed Amine"} />
        </>
    );
}

export default App;
