import styles from './About.module.css';

const About = (props) => {
    return (
        <div>
            <div className={styles.aboutSection}>
                <h1>About Us</h1>
                <p>This is a Covid-19 tracker App</p>
                <p>The project was made by Priyanshu Tiwari.</p>
                <p className={styles.question}>
                    Where can I find the data used for creating this app?
                </p>
                <p>
                    All the data is available through an API for further analysis and development here : api.covid19api.com/summary
                </p>
            </div>
            
        </div>
    );
}

export default About;