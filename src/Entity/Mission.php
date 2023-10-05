<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MissionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource]
class Mission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Statuts = null;

    #[ORM\Column(length: 255)]
    private ?string $Description = null;

    #[ORM\Column(length: 255)]
    private ?string $Titre = null;

    #[ORM\Column(length: 255)]
    private ?string $Difficulte = null;

    #[ORM\Column]
    private ?int $Duree = null;

    #[ORM\Column]
    private ?bool $Urgence = null;

    #[ORM\ManyToOne(inversedBy: 'creer')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateurCreer = null;

    #[ORM\ManyToOne(inversedBy: 'accepter')]
    private ?Utilisateur $utilisateurAccepter = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatuts(): ?string
    {
        return $this->Statuts;
    }

    public function setStatuts(string $Statuts): self
    {
        $this->Statuts = $Statuts;

        return $this;
    }

    public function getDifficulte(): ?string
    {
        return $this->Difficulte;
    }

    public function setDifficulte(string $Difficulte): self
    {
        $this->Difficulte = $Difficulte;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->Duree;
    }

    public function setDuree(int $Duree): self
    {
        $this->Duree = $Duree;

        return $this;
    }

    public function isUrgence(): ?bool
    {
        return $this->Urgence;
    }

    public function setUrgence(bool $Urgence): self
    {
        $this->Urgence = $Urgence;

        return $this;
    }

    public function getUtilisateurCreer(): ?Utilisateur
    {
        return $this->utilisateurCreer;
    }

    public function setUtilisateurCreer(?Utilisateur $utilisateurCreer): self
    {
        $this->utilisateurCreer = $utilisateurCreer;

        return $this;
    }

    public function getUtilisateurAccepter(): ?Utilisateur
    {
        return $this->utilisateurAccepter;
    }

    public function setUtilisateurAccepter(?Utilisateur $utilisateurAccepter): self
    {
        $this->utilisateurAccepter = $utilisateurAccepter;

        return $this;
    }
    
    public function getDescription(): ?string
    {
        return $this->Description;
    }
    
    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }
    public function getTitre(): ?string
    {
        return $this->Titre;
    }

    public function setTitre(string $Titre): self
    {
        $this->Titre = $Titre;

        return $this;
    }
}
