<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DemandeEchangeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DemandeEchangeRepository::class)]
#[ApiResource]
class DemandeEchange
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $estAccepte = null;

    #[ORM\ManyToOne(inversedBy: 'demandeEchange')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    #[ORM\ManyToOne(inversedBy: 'demandeEchange')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Echange $echange = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Produit $produit = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isEstAccepte(): ?bool
    {
        return $this->estAccepte;
    }

    public function setEstAccepte(bool $estAccepte): self
    {
        $this->estAccepte = $estAccepte;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    public function getEchange(): ?Echange
    {
        return $this->echange;
    }

    public function setEchange(?Echange $echange): self
    {
        $this->echange = $echange;

        return $this;
    }

    public function getProduit(): ?Produit
    {
        return $this->produit;
    }

    public function setProduit(Produit $produit): static
    {
        $this->produit = $produit;

        return $this;
    }
}
