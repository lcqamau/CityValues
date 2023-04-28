<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PanierRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PanierRepository::class)]
#[ApiResource(normalizationContext:["groups"=>"panier_read"])]
class Panier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups("panier_read")]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups("panier_read")]
    private ?string $Taille = null;

    #[ORM\ManyToOne]
    #[Groups("panier_read")]
    private ?Produit $Produits = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTaille(): ?string
    {
        return $this->Taille;
    }

    public function setTaille(string $Taille): self
    {
        $this->Taille = $Taille;

        return $this;
    }

    public function getProduits(): ?Produit
    {
        return $this->Produits;
    }

    public function setProduits(?Produit $Produits): self
    {
        $this->Produits = $Produits;

        return $this;
    }

}
