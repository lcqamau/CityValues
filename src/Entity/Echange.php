<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EchangeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EchangeRepository::class)]
#[ApiResource]
class Echange
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $statuts = null;

    #[ORM\OneToMany(mappedBy: 'echange', targetEntity: DemandeEchange::class, orphanRemoval: true)]
    private Collection $demandeEchange;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Produit $produitEchange = null;

    #[ORM\ManyToOne(inversedBy: 'echanges')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    public function __construct()
    {
        $this->demandeEchange = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatuts(): ?string
    {
        return $this->statuts;
    }

    public function setStatuts(string $statuts): self
    {
        $this->statuts = $statuts;

        return $this;
    }

    /**
     * @return Collection<int, DemandeEchange>
     */
    public function getDemandeEchange(): Collection
    {
        return $this->demandeEchange;
    }

    public function addDemandeEchange(DemandeEchange $demandeEchange): self
    {
        if (!$this->demandeEchange->contains($demandeEchange)) {
            $this->demandeEchange->add($demandeEchange);
            $demandeEchange->setEchange($this);
        }

        return $this;
    }

    public function removeDemandeEchange(DemandeEchange $demandeEchange): self
    {
        if ($this->demandeEchange->removeElement($demandeEchange)) {
            // set the owning side to null (unless already changed)
            if ($demandeEchange->getEchange() === $this) {
                $demandeEchange->setEchange(null);
            }
        }

        return $this;
    }

    public function getProduitEchange(): ?Produit
    {
        return $this->produitEchange;
    }

    public function setProduitEchange(Produit $produitEchange): self
    {
        $this->produitEchange = $produitEchange;

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

}
