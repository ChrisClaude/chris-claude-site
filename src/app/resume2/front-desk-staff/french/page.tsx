'use client';
import UIContext from '@/hooks/UIContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { FaLink, FaLinkedinIn, FaPhone } from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';

type Person = {
  surname: string;
  firstName: string;
  title: string;
  telephone: string;
  email: string;
  website: string;
  city: string;
  country: string;
};

const Resume = () => {
  const { uiState, setUIState } = useContext(UIContext);
  const person: Person = {
    firstName: 'Julien',
    surname: 'Koukodila',
    title: 'Receptionist',
    telephone: '+212 07 10 61 95 30',
    city: 'Diyar Tanja, 90000',
    country: 'Maroc',
    email: 'julienkoukodila2@gmail.com',
    website: 'https://www.linkedin.com/in/julien-koukodila-469838220/',
  };
  const technologies = [
    'Microsoft Excel',
    'Microsoft Word',
    'Microsoft Office',
  ];

  const skills = [
    'Résolution de problèmes',
    'Assertivité',
    'Créativité',
    'Pensée critique',
    "Travail d'équipe",
    "Gestion d'équipe",
    'Communication / Parler en public',
    'Gestion des risques',
  ];

  const references: {
    fullName: string;
    role: string;
    email: string;
    company: string;
  }[] = [
    {
      fullName: 'Claude De-Tchambila',
      role: 'Ingénieur logiciel senior',
      email: 'claude-christ.de-tchambila@capgemini.com',
      company: 'Capgemini',
    },
    {
      fullName: 'Belanganaye',
      role: 'Agent de service clientèle senior',
      email: '+27 83 859 6609',
      company: 'P3 People',
    },
    {
      fullName: 'Yumna',
      role: 'Agent de ressources humaines',
      email: '+27 65 537 7144',
      company: 'Trauma Center for Survivors of Violence and Torture',
    },
    {
      fullName: 'Lungi Gxagxisa',
      role: 'Agent de ventes',
      email: '+27 079 223 5053',
      company: 'Vodacom',
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
                  {person.firstName} {person.surname}
                </h1>
                <h2 className="text-2xl font-semibold text-blue-500">
                  {person.title}
                </h2>
              </div>
              <div className="grid grid-cols-2">
                <a
                  href={`tel:${person.telephone}`}
                  className="flex items-center">
                  <FaPhone className="mr-1 text-blue-500" />
                  {person.telephone}
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{' '}
                  {person.email}
                </a>
                <a
                  href={person.website}
                  target="_blank"
                  className="flex items-center">
                  <FaLink className="mr-1 text-blue-500" />
                  <span>My LinkedIn</span>
                </a>
                <p className="flex items-center">
                  <MdLocationPin className="mr-1 text-blue-500" />
                  {person.city}, {person.country}
                </p>
              </div>
            </div>

            <div className="rounded-full w-48 h-48">
              <Image
                width={300}
                height={300}
                src="/julien_koukodila.png"
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
                  <h2 className="text-xl font-semibold uppercase">Summary</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <p>
                  Je progresse dans un environnement axé sur les données et joue
                  avec des équipes interfonctionnelles pour résoudre des
                  problèmes complexes. Je suis passionné par l&apos;analyse et
                  l&apos;interprétation de données complexes pour prendre des
                  décisions commerciales et améliorer les processus. Avec plus
                  de trois ans d&apos;expérience dans l&apos;industrie de la
                  santé mentale en tant qu&apos;ingénieur de
                  simulation/analyste, j&apos;ai perfectionné mes compétences en
                  gestion de données, en analyse et en visualisation. Dans mon
                  rôle actuel, je utilise Python, JavaScript et Excel pour
                  fournir des insights qui soutiennent les initiatives
                  stratégiques et garantir la précision et la fiabilité des
                  données.
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
                    Agent de ressources humaines
                  </h3>
                  <p className="text-blue-500">
                    Trauma Center for Survivors of Violence and Torture
                  </p>
                  <p className="flex items-center">
                    <span>10/2023</span>
                    <span className="mx-1"> - </span> <span>Present</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, Afrique
                    du Sud
                  </p>
                  <div className="mt-1">
                    <p>
                      J&apos;ai assumé divers responsabilités en tant que
                      réceptionniste, secrétaire de projet et assistant RH,
                      toutes ces responsabilités contribuent de manière
                      significative au fonctionnement opérationnel des affaires.
                      Notamment, dans le domaine de la gestion du poste de
                      réception, j&apos;ai excellé dans la livraison d&apos;une
                      expérience professionnelle et accueillante pour les
                      visiteurs. Cela implique de manière adéquate la gestion
                      des appels entrants, en dirigeant les appels vers les
                      contacts appropriés et en en capturant les messages
                      lorsqu&apos;ils sont nécessaires. De plus, j&apos;ai été
                      compétent en fournissant des informations aux invités, en
                      répondant aux questions et en collaborant avec divers
                      services pour assurer un service ponctuel.
                    </p>
                  </div>
                </div>

                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">
                    Assistant de support client
                  </h3>
                  <p className="text-blue-500">Exness</p>
                  <p className="flex items-center">
                    <span>02/2023</span>
                    <span className="mx-1"> - </span> <span>09/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, Afrique
                    du Sud
                  </p>
                  <div className="mt-1">
                    <p>
                      Activement soutenu les clients existants et potentiels sur
                      plusieurs canaux de communication, y compris par e-mail,
                      chat et téléphone, en fournissant une assistance rapide,
                      précise et chaleureuse pour améliorer la satisfaction du
                      client. Résolu les questions en fournissant des
                      informations détaillées sur les produits, en guidant les
                      clients à travers les étapes de dépannage et en résolvant
                      les problèmes efficacement. Maintenu des registres
                      scrupuleux des interactions avec les clients, suivi de la
                      progression de la résolution des problèmes et assuré un
                      suivi ponctuel pour maintenir des normes de service
                      élevées. Démontré des compétences en communication
                      efficaces et une attention aux détails, en créant la
                      confiance et en établissant des relations durables avec
                      les clients.
                    </p>
                  </div>
                </div>

                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">
                    Agent de service client
                  </h3>
                  <p className="text-blue-500">P3 People</p>
                  <p className="flex items-center">
                    <span>10/2022</span>
                    <span className="mx-1"> - </span> <span>01/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, Afrique
                    du Sud
                  </p>
                  <div className="mt-1">
                    <p>
                      Mes responsabilités pendant cette période étaient les
                      suivantes :
                    </p>
                    <ul className="list-disc pl-5">
                      <li>
                        Fournir des informations sur divers politiques
                        d&apos;assurance auto, alternatives de couverture et
                        conditions pour des entreprises telles que CARTRAC,
                        FIRST FOR WOMEN, KING PRICE.
                      </li>
                      <li>
                        Expliquer les détails des politiques aux clients, comme
                        les déductions, les primes et les exclusions
                      </li>
                      <li>
                        Aider les consommateurs à acheter de nouvelles
                        assurances auto ou à renouveler les existantes.
                      </li>
                      <li>
                        Expliquer la procédure de renouvellement, y compris les
                        modifications de couverture et les ajustements de prime.
                      </li>
                      <li>
                        Gérer les demandes de modifications d&apos;assurance,
                        telles que changer les informations personnelles,
                        ajouter ou supprimer des conducteurs, ou modifier la
                        couverture. Assurez-vous que toutes les modifications de
                        politique sont correctement reflétées dans le système.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4 border-b-0 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Consultant</h3>
                  <p className="text-blue-500">Clear Review</p>
                  <p className="flex items-center">
                    <span>01/2022</span>
                    <span className="mx-1"> - </span> <span>09/2022</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
                    Africa
                  </p>
                  <div className="mt-1">
                    <p>
                      Mes responsabilités pendant cette période étaient les
                      suivantes :
                    </p>
                    <ul className="list-disc pl-5">
                      <li>
                        Utiliser des stratégies de médiation pour diriger la
                        conversation et créer un résultat positif et coopératif.
                      </li>
                      <li>
                        Déterminer les raisons racines des plaintes ou des
                        préoccupations des consommateurs afin de découvrir les
                        problèmes sous-jacents.
                      </li>
                      <li>
                        Négocier des solutions équitable et raisonnable pour les
                        deux des clients et de l&apos;organisation. Appliquer
                        les politiques et les processus de l&apos;entreprise
                        correctement, en veillant à ce que les solutions soient
                        conformes aux critères établis.
                      </li>
                      <li>
                        Clarifier les détails des politiques avec le client et
                        fournir des informations sur la raison de décisions
                        particulières, tels que la clarification de son nom à
                        partir d&apos;un problème de département
                      </li>
                    </ul>
                  </div>
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
                  <h2 className="text-xl font-semibold uppercase">Expertise</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>

                {/* Technologies  */}
                <div className="mb-6 border-b-2 border-dashed border-gray-400 pb-4">
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
                <div>
                  <h3 className="text-lg font-semibold uppercase mb-1 text-blue-500">
                    Power Skills
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
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Formation</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul>
                  <li className="border-b-2 border-dashed border-gray-400 pb-4">
                    <p className="text-lg">
                      Bachelor en Administration des Affaires
                    </p>
                    <p className="text-blue-500">
                      <a href="https://www.richfield.ac.za/" target="_blank">
                        Richfield Graduate Institute of Technology (Pty) Ltd
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>01/2021</span> <span className="mx-1">-</span>{' '}
                      <span className="mr-3">12/2023</span>{' '}
                      <MdLocationPin className="mr-1" /> Cape Town, Afrique du
                      Sud
                    </p>
                  </li>
                  <li className="mt-2">
                    <p className="text-lg">Matric</p>
                    <p className="text-blue-500">
                      <a href="https://www.richfield.ac.za/" target="_blank">
                        Notre Dame de Rosaire
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>2017</span> <MdLocationPin className="mr-1" />{' '}
                      Pointe-Noire, Congo-Brazzaville
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
                      <FaLinkedinIn className="text-xl text-blue-500" />
                      LinkedIn
                    </p>
                    <a
                      className="ml-6"
                      href="https://www.linkedin.com/in/julien-koukodila-469838220/"
                      target="_blank">
                      Julien Koukodila
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
