<?php

namespace App\DataFixtures;

use Faker\Factory;


use App\Entity\User;

use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     * l'encodeur de mots de passe
     *
     * @var UserPasswordHasherInterface
     */
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        

        for ($u=0; $u < 10 ; $u++) { 
            $user = new User();


            $hash = $this->encoder->hashPassword($user, "password");

            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($hash)
                ->setAdresse($faker->adresse);
                $manager->persist($user);
        }

        $manager->flush();
    }
}
