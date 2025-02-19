'use client';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import UIContext from '@/hooks/UIContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
  FaStackOverflow,
} from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { IoMdCheckbox } from 'react-icons/io';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';

const Resume = () => {
  const { uiState, setUIState } = useContext(UIContext);
  const technologies = [
    'C#',
    'C++',
    'JavaScript',
    'React JS',
    'Angular',
    'Python',
    'TensorFlow',
    'Java',
    'Docker',
    'Kubernetes',
    'Apache Kafka',
    'Microsoft Azure',
    'AWS',
  ];

  const skills = [
    'Problem solving',
    'Assertiveness',
    'Creativity',
    'Critical thinking',
    'Teamwork',
    'Team management',
    'Presentation / Public speaking',
    'Risk management',
  ];

  const references: {
    fullName: string;
    role: string;
    email: string;
    company: string;
  }[] = [
    {
      fullName: 'Prajwal Chengappa',
      role: 'Ingénieur en génie logiciel Senior',
      email: 'prajwal.chengappa@capgemini.com',
      company: 'Capgemini',
    },
    {
      fullName: 'Banish Jha',
      role: 'Ingénieur en génie logiciel Senior',
      email: 'banish.jha@nn-group.com',
      company: 'Nationale Nederlanden',
    },
    {
      fullName: 'Rens Van Driel',
      role: 'Ingénieur en génie logiciel',
      email: 'rens.van.a.driel@sogeti.com',
      company: 'Sogeti',
    },
  ];

  useEffect(() => {
    setUIState?.({ ...uiState, isResumePage: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 py-24 px-52 overflow-x-auto xl:flex xl:justify-center">
      <div className="flex flex-col justify-center" style={{ width: '1200px' }}>
        <div>
          {/* Header */}
          <div className="flex justify-between mb-10">
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold uppercase">
                  Claude De-Tchambila
                </h1>
                <h2 className="text-2xl font-semibold text-blue-500">
                  Ingénieur en génie logiciel
                </h2>
              </div>
              <div className="grid grid-cols-2">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center">
                  <FaPhone className="mr-1 text-blue-500" />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{' '}
                  {EMAIL_ADDRESS}
                </a>
                <a
                  href="https://chrisclaude.com"
                  target="_blank"
                  className="flex items-center">
                  <FaLink className="mr-1 text-blue-500" />
                  <span>chrisclaude.com</span>
                </a>
                <p className="flex items-center">
                  <MdLocationPin className="mr-1 text-blue-500" />
                  Poznan, Pologne
                </p>
              </div>
            </div>

            <div className="rounded-full w-48 h-48">
              <Image
                width={300}
                height={300}
                src="/about_me.png"
                alt="Chris Claude"
                className="rounded-full w-48 h-48"
              />
            </div>
          </div>

          {/* Main */}
          <div className="grid grid-cols-2 gap-x-28">
            {/* First Main Column */}
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Profil</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <p>
                  Je suis ingénieur en genie logiciel spécialisé dans la
                  conception de systèmes distribués et la mise en œuvre de
                  solutions logicielles. Fort d&apos;une solide expérience dans
                  le développement d&apos;applications web, et cloud, j&apos;ai
                  développé d&apos;excellentes compétences en programmation
                  informatique ainsi qu&apos;une passion pour
                  l&apos;apprentissage continu. Je suis un penseur critique avec
                  la passion d&apos;avoir un impact positif sur la vie des gens.
                </p>
              </div>

              {/* Work Experience  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Expérience professionnelle
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">
                    Ingénieur en génie logiciel
                  </h3>
                  <p className="text-blue-500">Capgemini</p>
                  <p className="flex items-center">
                    <span>07/2022</span>
                    <span className="mx-1"> - </span> <span>Present</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Poznan, Pologne
                  </p>
                  <div className="mt-1">
                    <p>
                      J&apos;ai travaillé sur l&apos;architecture et la mise en
                      œuvre de solutions logicielles pour des clients dans le
                      secteur des services financiers. La liste des clients avec
                      lesquels j&apos;ai collaboré inclut (sans s&apos;y
                      limiter) Nationale Nederlanden, l&apos;un des plus grands
                      fournisseurs d&apos;assurances aux Pays-Bas. J&apos;ai
                      conçu et implémenté des fonctionnalités qui ont amélioré
                      les processus métiers de mes clients. Les technologies que
                      j&apos;ai utilisées jusqu&apos;à présent incluent C#, SQL
                      Server, Microsoft Azure, React JS, TypeScript et
                      AzureDevOps. Voici quelques-unes des fonctionnalités sur
                      lesquelles j&apos;ai travaillé :
                    </p>
                    <ul className="list-disc ml-10 mt-1">
                      <li>
                        Dimension à changement lent de type 2 pour un système de
                        data warehouse
                      </li>
                      <li>
                        Importation et exportation de données sécurisées et
                        inter-environnements
                      </li>
                      <li>
                        Sécurité au niveau des lignes de données intégrée avec
                        Azure RBAC
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">
                    Ingénieur en génie logiciel
                  </h3>
                  <p className="text-blue-500">Dariel</p>
                  <p className="flex items-center">
                    <span>02/2021</span>
                    <span className="mx-1"> - </span> <span>06/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Johannesburg,
                    Afrique du Sud
                  </p>
                  <div className="mt-1">
                    <p>
                      J&apos;ai travaillé avec plusieurs clients sur divers
                      projets dans le secteur des services financiers. Mes
                      clients incluaient Sasfin Bank et Safrican Insurance,
                      désormais partie de Sanlam, le plus grand fournisseur
                      d&apos;assurances en Afrique du Sud. Voici quelques
                      projets auxquels j&apos;ai contribué
                    </p>
                    <ul className="list-disc ml-10 mt-1">
                      <li>
                        Une plateforme de trading Forex. Les technologies
                        utilisées étaient C#, TypeScript, ASP.NET Core, Angular,
                        AzureDevOps, RabbitMQ
                      </li>
                      <li>
                        Un système de vente d&apos;assurances. Les technologies
                        utilisées étaient C#, TypeScript, ASP.NET Core, Angular,
                        React, AzureDevOps
                      </li>
                      <li>
                        Un logiciel de gestion de pont-bascule dans
                        l&apos;industrie logistique. Les technologies utilisées
                        étaient C#, TypeScript, ASP.NET Core, Angular, Jira,
                        Jenkins, RabbitMQ
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    Ingénieur en génie logiciel
                  </h3>
                  <p className="text-blue-500">Exigent Group</p>
                  <p className="flex items-center">
                    <span>11/2020</span>
                    <span className="mx-1"> - </span> <span>02/2021</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, Afrique
                    du Sud
                  </p>
                  <p className="mt-1">
                    J&apos;ai principalement travaillé sur un projet visant à
                    créer un système logiciel permettant de traiter de grandes
                    quantités de documents (contrats d&apos;entreprise,
                    factures, accords juridiques) en utilisant
                    l&apos;apprentissage automatique et en fournissant des
                    informations critiques aux clients. J&apos;ai contribué au
                    développement des fonctionnalités backend et frontend ainsi
                    qu&apos;à l&apos;intégration avec des outils de machine
                    learning. Les technologies utilisées étaient Python, Django,
                    Keras, PyTorch et React JS.
                  </p>
                </div>
              </div>

              {/* References  */}
              <div>
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Références
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-y-3">
                  {references.map((reference, index) => (
                    <div key={index}>
                      <p>
                        <span className="text-blue-500 font-medium">
                          {reference.fullName}
                        </span>
                        <span className="ml-2 bg-slate-800 text-white p-1 rounded-md text-xs relative -top-1">
                          {reference.role}
                        </span>
                        <span className="ml-1 bg-gray-500 text-white p-1 rounded-md text-xs relative -top-1">
                          {reference.company}
                        </span>
                      </p>
                      <p>{reference.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Main Column */}
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Outils</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>

                {/* Technologies  */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold uppercase mb-2 text-blue-500">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Power Skills  */}
                {/* <div>
                  <h3 className="text-lg font-semibold uppercase mb-1 text-blue-500">
                    Compétences
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Education */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Éducation</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul>
                  <li className="border-b-2 border-dashed border-gray-400 pb-4">
                    <p className="text-lg">Licence en génie logiciel</p>
                    <p className="text-blue-500">
                      <a href="https://www.cput.ac.za/" target="_blank">
                        Cape Peninsula University of Technology
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>01/2018</span> <span className="mx-1">-</span>{' '}
                      <span className="mr-3">12/2020</span>{' '}
                      <MdLocationPin className="mr-1" /> Cape Town, Afrique du
                      Sud
                    </p>
                  </li>
                  <li className="mt-2">
                    <p className="text-lg">Ingénierie chimique</p>
                    <p className="text-blue-500">
                      <a
                        href="https://www.ctc.edu.za/cape-town-campus/"
                        target="_blank">
                        Central Technical College
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span className="mr-3">2017</span>
                      <MdLocationPin className="mr-1" /> Cape Town, Afrique du
                      Sud
                    </p>
                  </li>
                </ul>
              </div>

              {/* Languages  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Langues</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-2">
                  <li className="flex justify-between">
                    <div>
                      <p className="font-medium">Anglais</p>
                      <p className="text-sm">Avancé</p>
                    </div>
                    <div className="flex  gap-x-1">
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div>
                      <p className="font-medium">Français</p>
                      <p className="text-sm">Avancé</p>
                    </div>
                    <div className="flex gap-x-1">
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                    </div>
                  </li>
                </ul>
              </div>

              {/* Notable Projects */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Projets notables
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-5">
                  <li>
                    <p className="flex items-center gap-x-1  font-medium">
                      <IoMdCheckbox className="text-green-400 text-xl" />
                      <a
                        href="https://keepmeposted.com.mt/"
                        target="_blank"
                        className="ml-6 underline underline-offset-4 flex items-center gap-x-1">
                        <span>Keepmeposted.com.mt</span>
                        <FaExternalLinkAlt size={11} />
                      </a>
                    </p>
                    <p>
                      J&apos;ai travaillé en tant que développeur full stack sur
                      ce projet. Mes responsabilités comprenaient la création de
                      l&apos;API et de l&apos;interface utilisateur ainsi que la
                      mise en place du pipeline CI/CD sur Azure DevOps. Nous
                      avons utilisé .NET Core, Next.js et Microsoft Azure.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Find me online  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Me trouver en ligne
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-5">
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <GiEarthAfricaEurope className="text-xl text-blue-500" />
                      Site web
                    </p>
                    <a
                      href="https://chrisclaude.com"
                      target="_blank"
                      className="ml-6 flex items-center gap-x-1">
                      <span>chrisclaude.com</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <FaLinkedinIn className="text-xl text-blue-500" />
                      LinkedIn
                    </p>
                    <a
                      className="ml-6 flex items-center gap-x-1"
                      href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143/"
                      target="_blank">
                      <span>Claude De-Tchambila</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <FaGithub className="text-xl text-blue-500" />
                      GitHub
                    </p>
                    <a
                      className="ml-6 flex items-center gap-x-1"
                      href="https://github.com/ChrisClaude"
                      target="_blank">
                      <span>Chris Claude</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <FaStackOverflow className="text-xl text-blue-500" />
                      Stack Overflow
                    </p>
                    <a
                      className="ml-6 flex items-center gap-x-1"
                      href="https://stackoverflow.com/users/10338096/chris-claude"
                      target="_blank">
                      <span>Chris Claude</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
