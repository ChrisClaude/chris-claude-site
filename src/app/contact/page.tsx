import { FaLinkedinIn, FaYoutube, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Index() {
  return (
    <section>
      <h1>Get in touch</h1>
      <div>
        <ul className='flex'>
          <li className='mr-4'>
            <a href="https://twitter.com/ChrisClaude_" className="text-2xl" target="_blank"><FaTwitter /></a>
          </li>
          <li className='mr-4'>
            <a href="https://www.instagram.com/chrisclaude__" className="text-2xl" target="_blank"><FaInstagram /></a>
          </li>
          <li className='mr-4'>
            <a href="https://www.youtube.com/@chrisclaude" className="text-2xl" target="_blank"><FaYoutube /></a>
          </li>
          <li className='mr-4'>
            <a href="https://github.com/ChrisClaude" className="text-2xl" target="_blank"><FaGithub /></a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143" className="text-2xl" target="_blank"><FaLinkedinIn /></a>
          </li>
        </ul>
    </div>
      <form>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <textarea name="message" placeholder="Message"></textarea>
        <input type="submit" value="Send Message" />
      </form>
    </section>
  );
}
